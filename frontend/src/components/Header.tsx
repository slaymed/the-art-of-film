import React, { FC, ComponentProps, useCallback, ChangeEvent } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useDispatch } from "../hooks/useDispatch";

import TextHeader from "./elements/TextHeader";
import HeaderMenuCard from "./cards/HeaderMenuCard";
import Button from "./elements/Button";

import { user } from "../store/auth/selectors";
import { updateCurrency } from "../store/currency/actions";
import { Currency } from "../store/currency/types";
import { EUR, GBP, JPY, USD } from "../store/currency/constants";
import { cartData } from "../store/cart/selectors";
import { sideBarVisible } from "../store/ui/selectors";
import { toggleSideNav } from "../store/ui/actions";
import { currencySelector } from "../store/currency/selectors";

export interface HeaderProps extends ComponentProps<"header"> {}

export type RatesType = { [key: string]: number };

const Header: FC<HeaderProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const sideBarActive = useSelector(sideBarVisible);
    const userInfo = useSelector(user);
    const cart = useSelector(cartData);
    const currency = useSelector(currencySelector);

    const changeCurrency = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            dispatch(updateCurrency(event.target.value as Currency));
        },
        [dispatch]
    );

    return (
        <header
            {...rest}
            className={classNames("flex flex-col sticky top-0 z-50 bg-base h-top-nav", {
                [className]: className,
            })}
        >
            <div className="flex items-center justify-between px-12 py-2 bg-light-dark">
                <div className="flex w-fit gap-4 sm:gap-14 items-center">
                    <Button className="text-accent lg:hidden" onClick={() => dispatch(toggleSideNav())}>
                        {sideBarActive ? (
                            <i className="text-md fa-solid fa-close" />
                        ) : (
                            <i className="text-md fa-solid fa-bars" />
                        )}
                    </Button>
                    <a href="https://www.facebook.com/Henry4film/" target="_blank" rel="noreferrer">
                        <i className="text-blue-600/80 fa-brands fa-facebook" />
                    </a>

                    <a
                        href="https://www.instagram.com/the_artoffilm/?utm_medium=copy_link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="text-pink-600 fa-brands fa-instagram" />
                    </a>

                    <a href="https://www.youtube.com/channel/UCYDDoM6EPQryVyCzW9G-Ryg" target="_blank" rel="noreferrer">
                        <i className="text-red-600 fa-brands fa-youtube" />
                    </a>
                </div>
                <div className="flex items-center lg:space-x-8 w-fit">
                    <select
                        className="px-2.5 tracking-wider text-white bg-transparent"
                        value={currency}
                        onChange={changeCurrency}
                    >
                        <option value={GBP} className="text-black">
                            GBP
                        </option>
                        <option value={USD} className="text-black">
                            USD
                        </option>
                        <option value={EUR} className="text-black">
                            EUR
                        </option>
                        <option value={JPY} className="text-black">
                            JPY
                        </option>
                    </select>

                    {userInfo && (
                        <Link className="hidden lg:block text-lg tracking-widest text-accent" to="/profile">
                            My Account
                        </Link>
                    )}
                </div>
            </div>
            <div className={classNames("relative px-12 h-full py-3 flex items-center justify-between space-x-4")}>
                <Link className="relative -left-4 w-[240px] xl:w-[270px] sm:flex-shrink-0" to="/">
                    <img className="max-w-full" src="/images/logo.png" alt="theartoffilms" />
                </Link>

                <div className="hidden lg:flex items-center justify-center w-full space-x-12">
                    <Link className="text-lg tracking-widest text-accent" to="/">
                        Home
                    </Link>
                    <Link className="text-lg tracking-widest text-accent" to="/sellers">
                        Showcase
                    </Link>
                    <Link className="text-lg tracking-widest text-accent" to="/shop">
                        Shop
                    </Link>
                    <Link className="text-lg tracking-widest text-accent" to="/faq">
                        FAQ
                    </Link>
                    <Link className="text-lg tracking-widest text-accent" to="/page/subscriptions">
                        Subscriptions
                    </Link>

                    {userInfo && (
                        <Link className="text-lg tracking-widest text-accent" to={`/seller/${userInfo._id}`}>
                            My ShowCase
                        </Link>
                    )}

                    {!userInfo && (
                        <>
                            <Link
                                className="text-lg tracking-widest text-accent"
                                to={`/signin?redirect=${window.location.pathname}`}
                            >
                                Sign In
                            </Link>
                            <Link to="/page/subscriptions" className="px-3 py-2 tracking-wider text-black bg-accent">
                                Subscribe Now
                            </Link>
                        </>
                    )}
                </div>
                <Link className="hidden lg:flex items-center space-x-2 tracking-widest text-accent" to="/cart">
                    {cart && (
                        <div className="flex space-x-2 items-center">
                            <i className="fa-solid fa-cart-shopping" />
                            {cart.items.length > 0 && <TextHeader className="text-xl">{cart.items.length}</TextHeader>}
                        </div>
                    )}
                </Link>

                <HeaderMenuCard className="lg:hidden" />
            </div>
        </header>
    );
};

export default Header;
