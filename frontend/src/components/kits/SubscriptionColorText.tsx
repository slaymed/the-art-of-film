import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import Paragraph from "../elements/Paragraph";
import { GOLD, PLATINUM, SILVER } from "../../store/subscription/constants";
import { ISubscription } from "../../store/subscription/types";

export interface SubscriptionColorTextProps extends ComponentProps<"p"> {
    sub: ISubscription;
    text: string;
}

const SubscriptionColorText: FC<SubscriptionColorTextProps> = ({ className = "", sub, text, ...rest }) => {
    if (!text) return null;

    return (
        <Paragraph
            {...rest}
            className={classNames({
                [className]: className,
                "!text-slate-400": sub.name === SILVER,
                "!text-cyan-500": sub.name === PLATINUM,
                "!text-accent": sub.name === GOLD,
            })}
        >
            {text}
        </Paragraph>
    );
};

export default SubscriptionColorText;
