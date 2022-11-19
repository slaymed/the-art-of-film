import React, { FC, ComponentProps, useCallback, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { useDispatch } from "../../../hooks/useDispatch";

import Paragraph from "../../elements/Paragraph";
import OrderItemsCard from "../../cards/OrderItemsCard";
import OrderSummaryCard from "../../cards/OrderSummaryCard";

import { creatingSession } from "../../../store/stripe/selectors";
import { createOrderSession } from "../../../store/stripe/thunks";
import { RequestLifeCycle } from "../../../store/enums";
import { GlobalMessage, ThunkResponseType } from "../../../store/types";
import { ISession } from "../../../store/stripe/types";
import { IOrder } from "../../../store/orders/types";
import { User } from "../../../store/auth/types";

export interface PayOrderPageProps extends ComponentProps<"div"> {
    order: IOrder;
    user: User;
}

const PayOrderPage: FC<PayOrderPageProps> = ({ className = "", order, user, ...rest }) => {
    const dispatch = useDispatch();

    const paying = useSelector(creatingSession);

    const pay = useCallback(async () => {
        if (!order) return;

        const res = await dispatch(createOrderSession(order._id));
        const { status, data: session } = res.payload as ThunkResponseType<ISession, GlobalMessage>;
        if (status !== RequestLifeCycle.SUCCESS || !session) return;

        window.open(session.url, "_blank");
    }, [dispatch, order]);

    return (
        <div {...rest} className={classNames("flex flex-col space-y-8", { [className]: className })}>
            <Paragraph className="text-3xl">Order Payment</Paragraph>

            <div className="flex flex-col w-full space-y-8 lg:space-y-0 lg:flex-row lg:space-x-8">
                <div className="flex w-full lg:w-2/3">
                    <OrderItemsCard items={order.orderItems} />
                </div>
                <div className="w-full lg:w-1/3 lg:flex-1">
                    <OrderSummaryCard
                        buttonText="Pay"
                        errors={paying.errors}
                        shippingCost={order.shippingCost}
                        loading={paying.loading}
                        itemsPrice={order.itemsPrice}
                        totalPrice={order.totalPrice}
                        length={order.orderItems.length}
                        onClick={pay}
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(PayOrderPage);
