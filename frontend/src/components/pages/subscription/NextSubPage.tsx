import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import Paragraph from "../../elements/Paragraph";
import { NextSub } from "../../../store/subscription/types";
import { Period } from "../../../store/enums";
import CurrencyConvert from "../../kits/CurrencyConvert";
import dayjs from "dayjs";

export interface NextSubPageProps extends ComponentProps<"div"> {
    next_sub_data?: NextSub;
}

const NextSubPage: FC<NextSubPageProps> = ({ className = "", next_sub_data, ...rest }) => {
    if (!next_sub_data) return null;

    const price =
        next_sub_data.charge_period === Period.YEAR ? next_sub_data.sub.yearPrice : next_sub_data.sub.monthPrice;

    return (
        <div {...rest} className={classNames("flex flex-col space-y-4", { [className]: className })}>
            <Paragraph className="text-accent text-lg sm:text-xl font-bold tracking-widest uppercase">
                Moving To
            </Paragraph>
            <div className="flex gap-4 items-center flex-wrap">
                <Paragraph className="bg-slate-400/20 w-fit text-slate-400 py-0.5 px-2 rounded text-sm font-bold tracking-wider flex-shrink-0">
                    {next_sub_data.sub.name}
                </Paragraph>
                <Paragraph className="bg-slate-400/20 w-fit text-slate-400 py-0.5 px-2 rounded text-sm font-bold tracking-wider flex-shrink-0">
                    Waiting
                </Paragraph>
                <Paragraph className="bg-accent/20 w-fit text-accent py-0.5 px-2 rounded text-sm font-bold tracking-wider flex-shrink-0">
                    <CurrencyConvert amount={price} />
                </Paragraph>
                <Paragraph className="bg-slate-400/20 w-fit text-slate-400 py-0.5 px-2 rounded text-sm font-bold tracking-wider flex-shrink-0">
                    Billing {next_sub_data.charge_period === Period.MONETH && "Monthly"}
                    {next_sub_data.charge_period === Period.YEAR && "Yearly"}
                </Paragraph>
                <Paragraph className="text-sm w-fit line-clamp-1 py-0.5 px-2 bg-blue-500/20 text-blue-500 rounded tracking-wide font-bold">
                    Starts {dayjs(next_sub_data.start_date * 1000).format("MMM D, YYYY")}
                </Paragraph>
            </div>
        </div>
    );
};

export default NextSubPage;
