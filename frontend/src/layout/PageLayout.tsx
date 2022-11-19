import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import SellerSideBar from "../components/SellerSideBar";
import { sideBarVisible } from "../store/ui/selectors";

export interface PageLayoutProps extends ComponentProps<"div"> {}

const PageLayout: FC<PageLayoutProps> = ({ className = "", children, ...rest }) => {
    const sideBarActive = useSelector(sideBarVisible);

    return (
        <>
            <div
                {...rest}
                className={classNames("flex relative flex-1 min-h-screen-top-nav-less", { [className]: className })}
                style={{ perspective: 300 }}
            >
                <div className="hidden lg:block h-full bg-base sticky top-top-nav">
                    <SellerSideBar />
                </div>
                <div className="w-full flex-1 bg-light-dark pt-10 lg:pt-0">{children}</div>
            </div>
            <div
                className={classNames("lg:hidden bg-base duration-200 left-0 fixed top-top-nav h-screen-top-nav-less", {
                    "!-left-full": !sideBarActive,
                })}
            >
                <SellerSideBar />
            </div>
        </>
    );
};

export default PageLayout;
