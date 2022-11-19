import React, { FC, ComponentProps, useCallback } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IOrder } from "../../store/orders/types";
import { User } from "../../store/auth/types";
import { deleteOrder } from "../../store/orders/thunks";
import { removingOrder } from "../../store/orders/selectors";

import OrderInfoPieceCard from "./OrderInfoPieceCard";
import OrderInfoSeperator from "../kits/OrderInfoSeperator";
import CurrencyConvert from "../kits/CurrencyConvert";

import { useDispatch } from "../../hooks/useDispatch";

export interface OrderInfoCardProps extends ComponentProps<"div"> {
    order: IOrder;
    user: User;
    flexColOnly?: boolean;
    redirect?: boolean;
    showActions?: boolean;
}

const OrderInfoCard: FC<OrderInfoCardProps> = ({
    className = "",
    order,
    user,
    flexColOnly = false,
    redirect,
    showActions = true,
    ...rest
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading } = useSelector(removingOrder);

    const remove = useCallback(() => {
        if (order._id) dispatch(deleteOrder(order._id));
    }, [dispatch, order._id]);

    return (
        <div
            {...rest}
            className={classNames(
                "border-dashed relative flex-shrink-0 flex-col space-y-6 items-center border-2 text-white/80 flex border-accent/40 p-6",
                { [className]: className, "lg:flex-row lg:space-y-0 lg:space-x-6": !flexColOnly }
            )}
        >
            <OrderInfoPieceCard
                title="Order Id"
                body={order._id}
                flexColOnly={flexColOnly}
                bodyColor={redirect ? "#4d86ff" : undefined}
                onClick={redirect ? () => navigate(`/order/${order._id}`) : undefined}
            />
            <OrderInfoSeperator flexColOnly={flexColOnly} />

            <OrderInfoPieceCard
                title="Created By"
                body={order.user._id === user._id ? "You" : order.user.name}
                flexColOnly={flexColOnly}
            />
            <OrderInfoSeperator flexColOnly={flexColOnly} />

            <OrderInfoPieceCard
                title="Shipping Cost"
                body={<CurrencyConvert amount={order.shippingCost} />}
                flexColOnly={flexColOnly}
            />
            <OrderInfoSeperator flexColOnly={flexColOnly} />

            <OrderInfoPieceCard
                title="Total Price"
                body={<CurrencyConvert amount={order.totalPrice} />}
                flexColOnly={flexColOnly}
            />
            <OrderInfoSeperator flexColOnly={flexColOnly} />

            <OrderInfoPieceCard
                title="Status"
                body={
                    order.haveIssue
                        ? "Have an Issue"
                        : order.isPaid
                        ? order.isReceived
                            ? "Recieved"
                            : order.isDelivered
                            ? "Delivered"
                            : "Paid"
                        : "Not Paid"
                }
                bodyColor={order.haveIssue ? "red" : undefined}
                flexColOnly={flexColOnly}
            />
            {!order.isPaid && order.user._id === user._id && showActions && (
                <>
                    <OrderInfoSeperator flexColOnly={flexColOnly} />
                    <OrderInfoPieceCard
                        title="Actions"
                        body={loading ? "Removing..." : "Remove"}
                        bodyColor={loading ? "#4d86ff" : "red"}
                        onClick={loading ? undefined : remove}
                        flexColOnly={flexColOnly}
                    />
                </>
            )}
        </div>
    );
};

export default OrderInfoCard;
