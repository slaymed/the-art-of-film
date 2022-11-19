import React, { FC } from "react";

import { MappedSub } from "../../store/subscription/types";
import { SubscriptionStatus } from "../../store/subscription/enums";

import Paragraph from "../elements/Paragraph";

import dayjs from "dayjs";

export interface SubDateShowProps {
    sub: MappedSub;
}

const SubDateShow: FC<SubDateShowProps> = ({ sub }) => {
    if (sub.status === SubscriptionStatus.TRIALING && sub.trial_end && !sub.cancel_at_period_end)
        return (
            <Paragraph className="text-sm line-clamp-1 py-0.5 px-2 bg-blue-500/20 rounded text-blue-500 tracking-wide font-bold">
                Trial ends {dayjs(sub.trial_end * 1000).format("MMM D, YYYY")}
            </Paragraph>
        );

    if (sub.cancel_at_period_end && sub.cancel_at)
        return (
            <Paragraph className="text-sm line-clamp-1 py-0.5 px-2 bg-slate-400/20 text-slate-400 rounded tracking-wide font-bold">
                Cancels {dayjs(sub.cancel_at * 1000).format("MMM D, YYYY")}
            </Paragraph>
        );

    return null;
};

export default SubDateShow;
