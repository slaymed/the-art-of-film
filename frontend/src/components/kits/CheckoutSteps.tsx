import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import TextHeader from "../elements/TextHeader";

export interface CheckoutStepsProps extends ComponentProps<"div"> {
    step1?: boolean;
    step2?: boolean;
    step3?: boolean;
}

const CheckoutSteps: FC<CheckoutStepsProps> = ({ className = "", step1, step2, step3, ...rest }) => {
    return (
        <div {...rest} className={classNames("flex w-full", { [className]: className })}>
            <div
                className={classNames("w-full border-t-4 border-b-4 px-8 py-2 border-white", {
                    "!border-accent text-accent": step1,
                })}
            >
                <TextHeader className="text-sm sm:text-lg line-clamp-1 tracking-widest">Sign-in</TextHeader>
            </div>
            <div
                className={classNames("w-full border-t-4 border-b-4 px-8 py-2 border-white", {
                    "!border-accent text-accent": step2,
                })}
            >
                <TextHeader className="text-sm sm:text-lg line-clamp-1 tracking-widest"> Shipping</TextHeader>
            </div>
            <div
                className={classNames("w-full border-t-4 border-b-4 px-8 py-2 border-white", {
                    "!border-accent text-accent": step3,
                })}
            >
                <TextHeader className="text-sm sm:text-lg line-clamp-1 tracking-widest">Place Order</TextHeader>
            </div>
        </div>
    );
};

export default CheckoutSteps;
