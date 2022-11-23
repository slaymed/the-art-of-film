import React, { FC, ComponentProps, useCallback } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { useDispatch } from "../hooks/useDispatch";

import { fetchingUserOperation, user } from "../store/auth/selectors";
import { signout } from "../store/auth/thunks";
import { GlobalMessage, ThunkResponseType } from "../store/types";
import { RequestLifeCycle } from "../store/enums";

import TextHeader from "./elements/TextHeader";
import LoadingBox from "./kits/LoadingBox";
import SideBarLink from "./kits/SideBarLink";
import { SelectedList } from "../screens/OrdersScreen";
import CurrencyConvert from "./kits/CurrencyConvert";

export interface SellerSideBarProps extends ComponentProps<"div"> {}

const SellerSideBar: FC<SellerSideBarProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const userInfo = useSelector(user);
    const { loading } = useSelector(fetchingUserOperation);

    const logout = useCallback(async () => {
        const res = await dispatch(signout());

        const { status } = res.payload as ThunkResponseType<null, GlobalMessage>;

        if (status === RequestLifeCycle.SUCCESS) window.location.href = "/signin";
    }, [dispatch]);

    if (loading)
        return (
            <div
                {...rest}
                className={classNames("h-screen flex-shrink-0 bg-base p-12 min-w-[250px]", { [className]: className })}
            >
                <LoadingBox />
            </div>
        );

    if (!userInfo)
        return (
            <div
                {...rest}
                className={classNames("h-screen flex-shrink-0 text-accent bg-base p-12 min-w-[250px]", {
                    [className]: className,
                })}
            >
                <SideBarLink
                    to={`/signin?redirect=${window.location.pathname}`}
                    onClick={logout}
                    iconClasses="fas fa-arrow-right-from-bracket"
                    text="Sign In"
                />
            </div>
        );

    return (
        <div
            {...rest}
            className={classNames(
                "bg-base flex-shrink-0 text-accent flex flex-col space-y-2 p-12 w-side-nav scroll-bar overflow-y-auto min-h-screen-top-nav-less h-full",
                {
                    [className]: className,
                }
            )}
        >
            <div className="flex flex-col p-2 bg-gradient-to-tl from-accent/5 to-accent/20">
                <div className="flex justify-between items-center">
                    <TextHeader className="text-xl">Available</TextHeader>
                    <TextHeader className="text-xl">
                        <CurrencyConvert amount={userInfo.availableBalance} />
                    </TextHeader>
                </div>
                {userInfo.pendingBalance > 0 && (
                    <div className="flex justify-between items-center">
                        <TextHeader className="text-xl">Pending</TextHeader>
                        <TextHeader className="text-xl">
                            <CurrencyConvert amount={userInfo.pendingBalance} />
                        </TextHeader>
                    </div>
                )}
            </div>

            {userInfo.availableBalance > 0 && (
                <SideBarLink
                    to="/new-withdraw-request"
                    iconClasses="fas fa-solid fa-money-check-dollar"
                    text="Withdraw"
                />
            )}
            <SideBarLink to="/profile" iconClasses="fas fa-user" text="My Account" />
            <SideBarLink to="/posters/create" iconClasses="fas fa-list" text="Create Poster" />
            <SideBarLink to="/posters/seller" iconClasses="fas fa-list" text="Poster List" />
            <SideBarLink to="/my-subscription" iconClasses="fas fa-list" text="My Subscriptions" />
            <SideBarLink to="/purchaced-gifts" iconClasses="fa-solid fa-gift" text="Purchaced Gifts" />
            <SideBarLink to={`/seller/${userInfo._id}`} iconClasses="fas fa-images" text="My ShowCase" />
            <TextHeader className="text-xl text-tcolor">Selling</TextHeader>
            <SideBarLink
                to={`/orders?pannel=${SelectedList.C_O}`}
                iconClasses="fas fa-clipboard"
                text="Customers Orders"
            />
            <TextHeader className="text-xl text-tcolor">Buying</TextHeader>
            <SideBarLink
                to={`/orders?pannel=${SelectedList.M_O}`}
                iconClasses="fas fa-clipboard"
                text="Purchase Orders"
            />
            <TextHeader className="text-xl text-tcolor">Payments Settings</TextHeader>
            <SideBarLink to="/payment-methods" iconClasses="fas fa-credit-card" text="All Payment Methods" />
            <SideBarLink to="/payment-methods/credit-cards" iconClasses="fas fa-credit-card" text="Credit Cards" />
            <SideBarLink to="/withdraw-requests" iconClasses="fas fa-credit-card" text="Withdraw Requests" />
            <SideBarLink to="/shipment-settings" iconClasses="fa-solid fa-truck" text="Shipment Settings" />
            <SideBarLink to="#signout" onClick={logout} iconClasses="fas fa-arrow-right-from-bracket" text="Sign Out" />

            {/* {userInfo.isAdmin && (
                <div className="flex flex-col space-y-2">
                    <TextHeader className="text-xl text-tcolor">Admin Controlls</TextHeader>

                    <div className="flex flex-col space-y-2">
                        <SideBarLink to="/dashboard" iconClasses="fas fa-dashboard" text="Reports" />
                        <SideBarLink to="/posters" iconClasses="fas fa-list" text="All Posters" />

                        <Link to="/orderlist">
                            <div className="flex items-center justify-between space-x-2">
                                <SideBarLink to="/orderlist" iconClasses="fas fa-clipboard" text="Orders" />
                                {unreadMessagesCount > 0 && (
                                    <i className="text-lg fas fa-bell">
                                        <sup>{unreadMessagesCount}</sup>
                                    </i>
                                )}
                            </div>
                        </Link>

                        <SideBarLink to="/userlist" iconClasses="fas fa-users" text="Users" />
                        <SideBarLink to="/subscriptions" iconClasses="fas fa-credit-card" text="Subscriptions" />
                        <SideBarLink to="/subscriptions/create" iconClasses="fas fa-plus" text="Add Subscription" />
                        <SideBarLink
                            to="/withdraw-requests"
                            iconClasses="fas fa-credit-card"
                            text="Withdraw Requests"
                        />
                        <SideBarLink to="/settings" iconClasses="fas fa-cog" text="Settings" />
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default SellerSideBar;
