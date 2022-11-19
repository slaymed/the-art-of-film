import React, { FC, useCallback } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import Paragraph from "../../elements/Paragraph";
import Button from "../../elements/Button";
import LoadingBox from "../../kits/LoadingBox";

import { useDispatch } from "../../../hooks/useDispatch";

import { IOrder } from "../../../store/orders/types";
import { User } from "../../../store/auth/types";
import { markOrderAsDelivered, markOrderAsRecieved } from "../../../store/orders/thunks";
import { changingStatus } from "../../../store/orders/selectors";
import { Link } from "react-router-dom";

export interface ChatOrderControlProps {
    order: IOrder;
    user: User;
}

const ChatOrderControl: FC<ChatOrderControlProps> = ({ user, order }) => {
    const dispatch = useDispatch();

    const { loading } = useSelector(changingStatus);

    const deliver = useCallback(() => {
        dispatch(markOrderAsDelivered(order._id));
    }, [order, dispatch]);

    const recieve = useCallback(() => {
        dispatch(markOrderAsRecieved(order._id));
    }, [order, dispatch]);

    const isSeller = order.seller._id === user._id;
    const isBuyer = order.user._id === user._id;

    if (order.haveIssue)
        return (
            <div className="flex flex-col space-y-2">
                <Paragraph className="text-xs text-white/60">
                    Pending an <span className="text-accent/80 text-lg font-bold tracking-widest">AoF</span>{" "}
                    investigation, contact as on
                </Paragraph>
                <a href="mailto:admin@theartoffilm.co.uk">
                    <Paragraph className="text-accent text-xs">admin@theartoffilm.co.uk</Paragraph>
                </a>
                <Link to={`/issues/${order._id}`} type="button" className="w-fit">
                    <Paragraph className="text-accent underline text-sm font-bold underline-offset-2 tracking-wider">
                        See Issues
                    </Paragraph>
                </Link>
            </div>
        );

    if (order.isReceived)
        return (
            <div className="flex items-center justify-center px-4 py-2 space-x-2 text-xs bg-accent/10 text-accent">
                <span>
                    <i className="text-sm fa-solid fa-check" />
                </span>
                <Paragraph>Order Recieved</Paragraph>
            </div>
        );

    if (order.isDelivered && isBuyer)
        return (
            <Button
                className={classNames(
                    "w-fit flex items-center justify-center lg:w-full px-4 rounded-full bg-accent text-black py-1.5 lg:py-2.5",
                    {
                        "!bg-white/10 !text-white": loading,
                    }
                )}
                onClick={recieve}
                disabled={loading}
            >
                {loading ? (
                    <LoadingBox />
                ) : (
                    <Paragraph className="text-xs font-bold tracking-wider">Mark as Recieved</Paragraph>
                )}
            </Button>
        );

    if (order.isDelivered && isSeller)
        return (
            <Paragraph className="text-xs text-white/60">
                Waiting for <span className="text-accent/80">{order.user.name}</span> to tell if order is recieved
            </Paragraph>
        );

    if (isSeller)
        return (
            <Button
                className={classNames(
                    "w-fit flex items-center justify-center lg:w-full px-4 rounded-full bg-accent text-black py-1.5 lg:py-2.5",
                    {
                        "!bg-white/10 !text-white": loading,
                    }
                )}
                onClick={deliver}
                disabled={loading}
            >
                {loading ? (
                    <LoadingBox />
                ) : (
                    <Paragraph className="text-xs font-bold tracking-wider">Mark as Delivered</Paragraph>
                )}
            </Button>
        );

    if (isBuyer)
        return (
            <Paragraph className="text-xs text-white/60">
                Waiting for <span className="text-accent/80">{order.seller.name}</span> to send delivery
            </Paragraph>
        );

    return null;
};

export default ChatOrderControl;
