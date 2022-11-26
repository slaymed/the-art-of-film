import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import { MappedSub } from "../../store/subscription/types";
import Paragraph from "../elements/Paragraph";
import { SubscriptionStatus } from "../../store/subscription/enums";

export interface SubStatusBadgeProps extends ComponentProps<"p"> {
    sub: MappedSub;
    showTrial?: boolean;
}

const SubStatusBadge: FC<SubStatusBadgeProps> = ({ className = "", sub, showTrial = false, ...rest }) => {
    if (sub.status === SubscriptionStatus.TRIALING && !sub.cancel_at_period_end && !showTrial) return null;

    return (
        <Paragraph
            {...rest}
            className={classNames("text-sm capitalize py-0.5 px-2 rounded tracking-wider font-bold", {
                "bg-green-500/20 text-green-500": sub.status === SubscriptionStatus.ACTIVE,
                "bg-blue-500/20 text-blue-500": sub.status === SubscriptionStatus.TRIALING,
                "bg-slate-500/20 text-slate-500": sub.status === SubscriptionStatus.CANCELED,
                "bg-red-500/20 text-red-500": sub.status === SubscriptionStatus.PAST_DUE,
                [className]: className,
            })}
        >
            {sub.status.replace("_", " ")}
        </Paragraph>
    );
};

export default SubStatusBadge;
