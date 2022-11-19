import React, { FC, ComponentProps, useCallback } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import MessageBox from "../components/kits/MessageBox";
import Paragraph from "../components/elements/Paragraph";
import TextHeader from "../components/elements/TextHeader";
import Button from "../components/elements/Button";
import CurrencyConvert from "../components/kits/CurrencyConvert";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";

import { clearCart } from "../store/cart/thunks";
import { cartData, clearingCart } from "../store/cart/selectors";

import { useDispatch } from "../hooks/useDispatch";

export interface CartScreenProps extends ComponentProps<"div"> {}

const CartScreen: FC<CartScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(cartData);

    const clearing = useSelector(clearingCart);

    const clear = () => dispatch(clearCart());

    // const deleteItem = useCallback((id: string) => dispatch(cartRemove(id)), [dispatch]);
    const checkoutHandler = useCallback(() => navigate("/signin?redirect=/shipping"), [navigate]);

    if (!cart || cart.items.length === 0)
        return (
            <div className="flex items-center justify-center p-16 space-x-2 text-xl bg-light-dark">
                <MessageBox className="!text-xl">Cart is empty.</MessageBox>
                <Link to="/shop/name">
                    <Paragraph className="tracking-wider underline text-accent">Go Shopping</Paragraph>
                </Link>
            </div>
        );

    return (
        <div {...rest} className={classNames("flex flex-col space-y-8 p-8 bg-light-dark", { [className]: className })}>
            <div className="flex space-x-8 justify-between items-center">
                <TextHeader className="text-6xl">
                    <span className="text-accent">Shopping</span> Cart
                </TextHeader>
                {cart.items.length > 0 && (
                    <Button type="button" onClick={clear}>
                        <Paragraph className="underline underline-offset-2 text-red-600 text-sm capitalize">
                            Clear Cart
                        </Paragraph>
                    </Button>
                )}
            </div>

            <ErrorWithRedirect {...clearing} />

            <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row lg:space-x-8">
                <div className="flex flex-col w-full scroll-bar space-y-4 overflow-y-auto max-h-[600px]">
                    {cart.items.map((item) => (
                        <div key={item._id} className="flex items-center justify-between space-x-4">
                            <div className="flex items-center justify-center flex-shrink-0 w-20 h-12 md:w-24 lg:w-28 md:h-16 lg:h-20">
                                <img src={item.image} alt={item.name} className="max-w-full max-h-full" />
                            </div>

                            <Link to={`/product/${item._id}`}>
                                <Paragraph className="text-sm line-clamp-1">{item.name}</Paragraph>
                            </Link>

                            <Paragraph className="text-sm line-clamp-1">
                                <CurrencyConvert amount={item.price} />
                            </Paragraph>

                            <button className="px-4 py-2 text-black bg-white">Delete</button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col w-full space-y-4 lg:w-fit">
                    <Paragraph className="ml-auto">
                        Subtotal ({cart.items.length} items) : <CurrencyConvert amount={cart.itemsPrice} />
                    </Paragraph>
                    <Button
                        type="button"
                        onClick={checkoutHandler}
                        className={classNames("py-2 lg:w-64 px-6 tracking-wider text-black bg-accent", {
                            "bg-dark-card": cart.items.length === 0,
                        })}
                        disabled={cart.items.length === 0}
                    >
                        Proceed
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartScreen;
