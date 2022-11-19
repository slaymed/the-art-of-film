import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

export interface OrderInfoSeperatorProps extends ComponentProps<"div"> {
    flexColOnly?: boolean;
}

const OrderInfoSeperator: FC<OrderInfoSeperatorProps> = ({ className = "", flexColOnly, ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames("border-b-2 border-accent/40 w-full border-dashed", {
                [className]: className,
                "lg:border-b-0 lg:border-l-2 lg:h-20 lg:w-0": !flexColOnly,
            })}
        />
    );
};

export default OrderInfoSeperator;
