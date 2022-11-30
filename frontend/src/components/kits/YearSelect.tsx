import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";

import { yearOptions } from "../../data";

export interface YearSelectProps extends ComponentProps<"select"> {}

const YearSelect: FC<YearSelectProps> = ({ className = "", value, ...rest }) => {
    return (
        <select
            {...rest}
            value={value}
            className={classNames("w-full bg-slate-700 p-3 text-white", { [className]: className })}
        >
            <option value="" disabled={!value} className={classNames("text-slate-500", { "text-red-500": value })}>
                {value ? "Clear" : "Year"}
            </option>
            {yearOptions.map((o) => (
                <option key={o.label} value={o.label} className="text-lg">
                    {o.label}
                </option>
            ))}
        </select>
    );
};

export default memo(YearSelect);
