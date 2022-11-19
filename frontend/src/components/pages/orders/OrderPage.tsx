import React, { FC, memo } from "react";

import { IOrder } from "../../../store/orders/types";
import { User } from "../../../store/auth/types";

import PayOrderPage from "./PayOrderPage";
import OrderChatPage from "./OrderChatPage";
import Paragraph from "../../elements/Paragraph";
import OrderInfoCard from "../../cards/OrderInfoCard";
import OrderAddressCard from "../../cards/OrderAddressCard";

export interface OrderPageProps {
    order: IOrder;
    user: User;
}

const OrderPage: FC<OrderPageProps> = ({ order, user }) => {
    return (
        <div className="flex flex-col p-8 space-y-8 bg-light-dark">
            <div className="flex flex-col space-y-8">
                <Paragraph className="text-3xl">Order States</Paragraph>
                <OrderInfoCard order={order} user={user} />
            </div>

            {order.isPaid && (
                <div className="flex flex-col space-y-8">
                    <Paragraph className="text-3xl">
                        {order.isDelivered ? "Delivery Sent To" : "Shipping Info"}
                    </Paragraph>
                    <OrderAddressCard order={order} user={user} />
                </div>
            )}

            {order.isPaid && <OrderChatPage chatId={order.chatId} user={user} />}
            {!order.isPaid && order.user._id === user._id && <PayOrderPage order={order} user={user} />}
        </div>
    );
};

export default memo(OrderPage);
