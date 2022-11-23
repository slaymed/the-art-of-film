import React, { FC, ComponentProps, useCallback, useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "../hooks/useDispatch";

import TextHeader from "../components/elements/TextHeader";
import Paragraph from "../components/elements/Paragraph";
import Button from "../components/elements/Button";

import { SessionStatus, SessionType } from "../store/stripe/enums";
import { updateStripeProp } from "../store/stripe/actions";
import { cancelSession } from "../store/stripe/thunks";
import { currentSession } from "../store/stripe/selectors";
import { ISession } from "../store/stripe/types";
import { RequestLifeCycle } from "../store/enums";
import { fetchOrders, syncOrder } from "../store/orders/thunks";
import { GlobalMessage, RealtimeResponseType, ThunkResponseType } from "../store/types";
import { fetchMyGifts, syncGift } from "../store/gifts/thunks";
import { fetchChatListObject, fetchOrderChat } from "../store/chat/thnuks";

import { socket } from "../App";

export interface SessionHandleScreenProps extends ComponentProps<"div"> {}

const SessionHandleScreen: FC<SessionHandleScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const session = useSelector(currentSession);

    const close = useCallback(() => dispatch(updateStripeProp({ currentSession: null })), [dispatch]);
    const cancel = useCallback(async () => {
        if (!session) return;

        const clone = { ...session };

        const res = await dispatch(cancelSession(session));

        const { status } = res.payload as ThunkResponseType<ISession, GlobalMessage>;
        if (status !== RequestLifeCycle.SUCCESS) return;

        switch (clone.type) {
            case SessionType.ADVERTISMENT:
                break;
            case SessionType.POSTER:
                window.location.href = "/shop";
                break;
            case SessionType.GIFT:
                break;
            default:
                console.log(`${session.type} is not supported yet`);
        }
    }, [session, dispatch]);

    const paid = useCallback(
        ({ data: session, success }: RealtimeResponseType<ISession>) => {
            if (!success) return;

            dispatch(updateStripeProp({ currentSession: session }));

            switch (session.type) {
                case SessionType.ADVERTISMENT:
                    break;
                case SessionType.POSTER:
                    dispatch(syncOrder(session.ref));
                    dispatch(fetchOrderChat(session.ref));
                    break;
                case SessionType.GIFT:
                    dispatch(syncGift(session.ref));
                    navigate(`/purchaced-gifts/${session.ref}`);
                    break;
                default:
                    console.log(`${session.type} is not supported yet`);
            }
        },
        [dispatch, navigate]
    );
    useEffect(() => {
        socket.on("checkout-session-paid", paid);
        return () => socket.removeListener("checkout-session-paid", paid) as any;
    }, [paid]);

    const refunded = useCallback(
        ({ data: session, success }: RealtimeResponseType<ISession>) => {
            if (!success) return;

            dispatch(updateStripeProp({ currentSession: session }));

            switch (session.type) {
                case SessionType.ADVERTISMENT:
                    break;
                case SessionType.POSTER:
                    dispatch(fetchOrders());
                    dispatch(fetchChatListObject());
                    break;
                case SessionType.GIFT:
                    dispatch(fetchMyGifts());
                    break;
                default:
                    console.log(`${session.type} is not supported yet`);
            }
        },
        [dispatch]
    );
    useEffect(() => {
        socket.on("checkout-session-refuded", refunded);
        return () => socket.removeListener("checkout-session-refuded", refunded) as any;
    }, [refunded]);

    if (!session) return null;

    if (session.status === SessionStatus.REFUNDED && session.refund)
        return (
            <div
                {...rest}
                className={classNames(
                    "fixed left-0 top-0 w-full h-screen bg-black/90 flex justify-center items-center z-50",
                    {
                        [className]: className,
                    }
                )}
            >
                <div className="p-10 bg-base flex flex-col space-y-12">
                    <div className="flex flex-col space-y-2">
                        <Paragraph className="text-4xl tracking-wider uppercase text-accent">
                            Amount {session.status}
                        </Paragraph>
                        <Paragraph className="text-sm text-tcolor/70">
                            Sorry!, The Amount you paid has been refunded.
                        </Paragraph>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button className="text-red-500" onClick={close}>
                            <Paragraph className="text-lg">Close</Paragraph>
                        </Button>
                        <Button
                            type="button"
                            className="flex space-x-2 items-center text-blue-500 underline"
                            onClick={() => window.open(session.refund?.url, "_blank")}
                        >
                            <Paragraph className="text-sm">Open Receipt</Paragraph>
                        </Button>
                    </div>
                </div>
            </div>
        );

    return (
        <div
            {...rest}
            className={classNames(
                "fixed left-0 top-0 w-full h-screen bg-black/80 flex justify-center items-center z-50",
                {
                    [className]: className,
                }
            )}
        >
            <div className="relative w-full max-w-md">
                <div className="flex flex-col w-full border-2 items-center space-y-12 border-accent bg-gradient-to-b from-base to-light-dark py-16">
                    <TextHeader className="text-7xl w-full py-2 text-center bg-gradient-to-tl from-accent/5 to-accent/20 text-accent">
                        {session.status === SessionStatus.PAID ? "Thank You" : "In Process"}
                    </TextHeader>

                    {session.status === SessionStatus.REFUNDED && (
                        <Paragraph className="text-md text-center w-2/3">Refunded</Paragraph>
                    )}

                    {session.status === SessionStatus.UNPAID && (
                        <Paragraph className="text-md text-center w-2/3">
                            Please complete your payment in the stripe checkout page
                        </Paragraph>
                    )}

                    {session.status === SessionStatus.PAID ? (
                        <div className="w-32 h-32 bg-accent rounded-full flex items-center justify-center">
                            <span>
                                <i className="text-7xl fas fa-solid fa-check" />
                            </span>
                        </div>
                    ) : (
                        <span>
                            <i className="text-9xl text-accent fas fa-circle-notch fa-spin" />
                        </span>
                    )}

                    {session.status === SessionStatus.PAID && (
                        <Paragraph>Payment has been successfully processed.</Paragraph>
                    )}

                    <Button className="text-red-500" onClick={session.status === SessionStatus.PAID ? close : cancel}>
                        <TextHeader className="text-3xl">
                            {session.status === SessionStatus.PAID ? "Close" : "Cancel"}
                        </TextHeader>
                    </Button>

                    {session.status !== SessionStatus.PAID && (
                        <div className="justify-center text-md space-x-2 flex items-center text-sm">
                            <Paragraph className="text-tcolor">Checkout page closed?</Paragraph>
                            <Paragraph
                                onClick={() => window.open(session.url, "_blank")}
                                className="text-blue-500 cursor-pointer underline"
                            >
                                Open Again
                            </Paragraph>
                        </div>
                    )}
                </div>
                <div className="absolute inset-x-4 h-16 top-0 flex justify-between items-center">
                    <span className="py-0.5 px-2 bg-accent text-black tracking-wider">{session.type}</span>
                    <span className="py-0.5 px-2 text-end bg-white/90 text-black tracking-wider">{session.status}</span>
                </div>
            </div>
        </div>
    );
};

export default SessionHandleScreen;
