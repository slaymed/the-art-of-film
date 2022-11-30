import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";

import data from "../../data";

export interface ConditionSelectProps extends ComponentProps<"select"> {}

const ConditionSelect: FC<ConditionSelectProps> = ({ className = "", value, ...rest }) => {
    return (
        <select
            {...rest}
            value={value}
            className={classNames("w-full bg-slate-700 p-3 text-white", { [className]: className })}
        >
            <option value="" disabled={!value} className={classNames("text-slate-500", { "text-red-500": value })}>
                {value ? "Clear" : "Condition"}
            </option>
            {data.conditions.map((c) => (
                <option key={c.label} value={c.label} className="text-lg">
                    {c.label}
                </option>
            ))}
        </select>
    );
};

export default memo(ConditionSelect);
