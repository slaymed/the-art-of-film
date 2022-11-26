import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Paragraph from "../../elements/Paragraph";
import ChatOrderControl from "./ChatOrderControl";
import MessageBox from "../../kits/MessageBox";
import ChatOrderItem from "./ChatOrderItem";

import { selectedChatOrderObject } from "../../../store/chat/selectors";
import { user } from "../../../store/auth/selectors";
import { changingStatus } from "../../../store/orders/selectors";

export interface ChatOrderSectionProps extends ComponentProps<"div"> {}

const ChatOrderSection: FC<ChatOrderSectionProps> = ({ className = "", ...rest }) => {
    const { orderId } = useParams();

    const order = useSelector(selectedChatOrderObject);
    const userInfo = useSelector(user);
    const { errors } = useSelector(changingStatus);

    if (!order || !userInfo)
        return (
            <div
                {...rest}
                className={classNames("flex flex-col space-y-3 bg-gray-500/5 w-full h-full flex-1", {
                    [className]: className,
                })}
            >
                <div className="flex p-4 bg-gray-500/5">
                    <Paragraph className="text-sm font-bold tracking-wider">Order</Paragraph>
                </div>
                <div className="flex justify-center items-center w-full h-full min-h-[150px]">
                    <Paragraph className="text-sm text-white/40">Chat Order will show here!</Paragraph>
                </div>
            </div>
        );

    return (
        <div
            {...rest}
            className={classNames("flex flex-col space-y-3 bg-gray-500/5 w-full h-full", {
                [className]: className,
            })}
        >
            <div className="flex p-4 justify-between space-x-2 bg-gray-500/5 items-center">
                <div className="flex space-x-2 items-center">
                    <Paragraph className="text-sm font-bold tracking-wider">Orderd By</Paragraph>
                    <Paragraph className="text-xs font-bold tracking-wider text-accent/80">
                        {order.user._id === userInfo._id ? "You" : order.user.name}
                    </Paragraph>
                </div>
                {order.isPaid && (
                    <Paragraph className="py-0.5 w-fit h-fit text-[10px] px-1.5 bg-accent/10 text-accent">
                        Paid
                    </Paragraph>
                )}
            </div>

            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col h-full space-y-4 px-4">
                    <div className="flex flex-col w-full space-y-4">
                        <Paragraph className="text-md">Posters</Paragraph>
                        <div className="w-fit max-w-full flex space-x-4 pb-1 scroll-bar overflow-x-auto overflow-y-hidden">
                            {order.orderItems.map((item) => (
                                <ChatOrderItem key={item._id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-4 space-y-4">
                    {orderId !== order._id && (
                        <Link to={`/order/${order._id}`}>
                            <Paragraph className="text-sm line-clamp-1 underline underline-offset-2 text-accent">
                                Go to order page
                            </Paragraph>
                        </Link>
                    )}
                    {order.isPaid && !order.haveIssue && !order.isRecieved && (
                        <Link className="w-fit" to={`/raise-an-issue/${order._id}`}>
                            <Paragraph className="text-accent underline text-sm font-bold underline-offset-2 tracking-wider">
                                Raise an Issue
                            </Paragraph>
                        </Link>
                    )}
                    {errors.message && <MessageBox>{errors.message}</MessageBox>}
                    <ChatOrderControl order={order} user={userInfo} />
                </div>
            </div>
        </div>
    );
};

export default ChatOrderSection;
