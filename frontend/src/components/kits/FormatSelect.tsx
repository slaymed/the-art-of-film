import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";

import data from "../../data";

export interface FormatSelectProps extends ComponentProps<"select"> {}

const FormatSelect: FC<FormatSelectProps> = ({ className = "", value, ...rest }) => {
    return (
        <select
            {...rest}
            value={value}
            className={classNames("w-full bg-slate-700 p-3 text-white", { [className]: className })}
        >
            <option value="" disabled={!value} className={classNames("text-slate-500", { "text-red-500": value })}>
                {value ? "Clear" : "Format"}
            </option>
            {data.formats.map((f) => (
                <option key={f.value} value={f.value} className="text-lg">
                    {f.value}
                </option>
            ))}
        </select>
    );
};

export default memo(FormatSelect);
