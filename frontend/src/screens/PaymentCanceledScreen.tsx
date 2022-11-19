import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Paragraph from "../components/elements/Paragraph";
import TextHeader from "../components/elements/TextHeader";

export interface PaymentCanceledScreenProps extends ComponentProps<"div"> {}

const PaymentCanceledScreen: FC<PaymentCanceledScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames(
                "sm:p-16 flex justify-center items-center min-h-screen-top-nav-less text-center bg-light-dark",
                {
                    [className]: className,
                }
            )}
        >
            <div className="px-16 py-16 bg-dark-card flex flex-col space-y-8 items-center">
                <div className="rounded-full flex justify-center items-center bg-white text-accent w-48 h-48">
                    <i className="text-9xl relative -left-3.5 top-2">x</i>
                </div>

                <TextHeader className="text-3xl sm:text-6xl text-center text-accent !tracking-widest">
                    Failed
                </TextHeader>
                <Paragraph className="text-sm text-tcolor/60 text-center">
                    Sorry Your Payment has been canceled.
                </Paragraph>
                <Link to="/profile" className="w-fit text-accent flex-col flex space-y-4 items-center justify-center">
                    <i className="text-7xl fa fa-user"></i>
                    <span className="text-2xl">My Account</span>
                </Link>
            </div>
        </div>
    );
};

export default PaymentCanceledScreen;
