import React, { FC, ComponentProps, useCallback } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "../hooks/useDispatch";

import { creatingOrder } from "../store/orders/selectors";
import { cartData } from "../store/cart/selectors";
import { createOrder } from "../store/orders/thunks";
import { GlobalMessage, ThunkResponseType } from "../store/types";
import { IOrder } from "../store/orders/types";
import { RequestLifeCycle } from "../store/enums";
import { clearCart } from "../store/cart/thunks";
import { user } from "../store/auth/selectors";
import { User } from "../store/auth/types";

import CheckoutSteps from "../components/kits/CheckoutSteps";
import TextHeader from "../components/elements/TextHeader";
import ShippingAddressCard from "../components/cards/ShippingAddressCard";
import OrderItemsCard from "../components/cards/OrderItemsCard";
import OrderSummaryCard from "../components/cards/OrderSummaryCard";

export interface PlaceOrderScreenProps extends ComponentProps<"div"> {}

const PlaceOrderScreen: FC<PlaceOrderScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const create = useSelector(creatingOrder);
    const cart = useSelector(cartData);
    const userInfo = useSelector(user);

    const placeOrder = useCallback(async () => {
        const res = await dispatch(createOrder());
        const { status, data: order } = res.payload as ThunkResponseType<IOrder, GlobalMessage>;
        if (status !== RequestLifeCycle.SUCCESS) return;

        dispatch(clearCart());
        if (order) navigate(`/order/${order._id}`);
    }, [dispatch, navigate]);

    if (!cart) return null;

    if (cart.items.length === 0)
        return (
            <div className="flex justify-center p-16 space-x-2 bg-light-dark">
                <TextHeader className="text-7xl">Cart Is Empty</TextHeader>
                <Link to="/shop">
                    <TextHeader className="text-7xl text-accent">Go Shopping</TextHeader>
                </Link>
            </div>
        );

    return (
        <div {...rest} className={classNames("flex flex-col space-y-8 p-8 bg-light-dark", { [className]: className })}>
            <CheckoutSteps step1 step2 step3 />
            <div className="flex flex-col w-full space-y-8 lg:space-y-0 lg:flex-row lg:space-x-8">
                <div className="flex flex-col w-full space-y-8 lg:w-2/3">
                    <ShippingAddressCard shippingAddress={cart.shippingAddress} userInfo={userInfo as User} />
                    <OrderItemsCard items={cart.items} />
                </div>
                <div className="w-full lg:w-1/3 lg:flex-1">
                    <OrderSummaryCard
                        buttonText="Place Order"
                        errors={create.errors}
                        loading={create.loading}
                        shippingCost={cart.totalPrice - cart.itemsPrice}
                        itemsPrice={cart.itemsPrice}
                        totalPrice={cart.totalPrice}
                        length={cart.items.length}
                        onClick={placeOrder}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
