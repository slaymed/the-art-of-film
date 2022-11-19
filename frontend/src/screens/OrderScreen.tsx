import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { user } from "../store/auth/selectors";
import { fetchingOrders, orderSelector } from "../store/orders/selectors";

import TextHeader from "../components/elements/TextHeader";
import LoadingBox from "../components/kits/LoadingBox";
import OrderPage from "../components/pages/orders/OrderPage";

export interface PayOrderScreenProps extends ComponentProps<"div"> {}

const PayOrderScreen: FC<PayOrderScreenProps> = ({ className = "", ...rest }) => {
    const { orderId = "" } = useParams();

    const order = useSelector(orderSelector(orderId));
    const userInfo = useSelector(user);
    const fetching = useSelector(fetchingOrders);

    if (fetching.loading)
        return (
            <div {...rest} className={classNames("p-16 justify-center flex", { [className]: className })}>
                <LoadingBox />
            </div>
        );

    if (!order)
        return (
            <div {...rest} className={classNames("p-16 justify-center flex", { [className]: className })}>
                <TextHeader className="text-4xl sm:text-5xl md:text-7xl">
                    Order <span className="text-accent">Not Found</span>
                </TextHeader>
            </div>
        );

    return userInfo && <OrderPage user={userInfo} order={order} />;
};

export default PayOrderScreen;
