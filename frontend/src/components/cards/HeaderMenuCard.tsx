import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { user } from "../../store/auth/selectors";
import { cartData } from "../../store/cart/selectors";

export interface HeaderMenuCardProps extends ComponentProps<"div"> {}

const HeaderMenuCard: FC<HeaderMenuCardProps> = ({ className = "", ...rest }) => {
    const userInfo = useSelector(user);
    const cart = useSelector(cartData);

    return (
        <div {...rest} className={classNames("p", { [className]: className })}>
            <Menu>
                <Menu.Button className="bg-light-dark border border-accent text-accent bordr-accent py-1 px-3">
                    <i className="text-xl fa-solid fa-bars" />
                </Menu.Button>

                <Menu.Items className="absolute w-full max-w-[260px] mt-4 right-12 p-4 shadow-lg shadow-black border border-accent bg-light-dark flex flex-col space-y-4">
                    {userInfo && (
                        <>
                            <Link className="tracking-widest text-accent" to="/profile">
                                <Menu.Item>
                                    {() => (
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl">My Account</span>
                                            <i className="text-xl fa-solid fa-user" />
                                        </div>
                                    )}
                                </Menu.Item>
                            </Link>
                            <div className="border-b border-accent" />
                        </>
                    )}

                    <Link className="tracking-widest text-accent" to="/">
                        <Menu.Item>{() => <span className="text-xl">Home</span>}</Menu.Item>
                    </Link>
                    <Link className="tracking-widest text-accent" to="/sellers">
                        <Menu.Item>{() => <span className="text-xl">Showcase</span>}</Menu.Item>
                    </Link>
                    <Link className="tracking-widest text-accent" to="/shop/name">
                        <Menu.Item>{() => <span className="text-xl">Shop</span>}</Menu.Item>
                    </Link>
                    <Link className="tracking-widest text-accent" to="/faq">
                        <Menu.Item>{() => <span className="text-xl">FAQ</span>}</Menu.Item>
                    </Link>

                    <Link className="tracking-widest text-accent" to="/page/subscriptions">
                        <Menu.Item>{() => <span className="text-xl">Subscriptions</span>}</Menu.Item>
                    </Link>
                    {userInfo && (
                        <Link className="tracking-widest text-accent" to={`/seller/${userInfo._id}`}>
                            <Menu.Item>{() => <span className="text-xl">My ShowCase</span>}</Menu.Item>
                        </Link>
                    )}

                    {!userInfo && (
                        <>
                            <div className="border-t border-accent" />
                            <div className="flex justify-between items-center">
                                <Link
                                    className="tracking-widest text-accent"
                                    to={`/signin?redirect=${window.location.pathname}`}
                                >
                                    <Menu.Item>{() => <span className="text-xl">Sign In</span>}</Menu.Item>
                                </Link>
                                <Link to="/page/subscriptions" className="tracking-widest text-accent">
                                    <Menu.Item>{() => <span className="text-xl">Subscribe Now</span>}</Menu.Item>
                                </Link>
                            </div>
                        </>
                    )}

                    {userInfo && cart && (
                        <>
                            <div className="border-t border-accent" />

                            <Link className="flex items-center space-x-2 tracking-widest text-accent" to="/cart">
                                <Menu.Item>
                                    {() => (
                                        <div className="flex w-full justify-between items-center">
                                            <span className="text-xl">Shopping Cart</span>

                                            <div className="flex space-x-2 items-center">
                                                <i className="fa-solid fa-cart-shopping" />
                                                {cart.items.length > 0 && (
                                                    <span className="text-xl">{cart.items.length}</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Menu.Item>
                            </Link>
                        </>
                    )}
                </Menu.Items>
            </Menu>
        </div>
    );
};

export default HeaderMenuCard;
