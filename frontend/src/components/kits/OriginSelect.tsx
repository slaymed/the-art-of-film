import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";

import data from "../../data";

export interface OriginSelectProps extends ComponentProps<"select"> {}

const OriginSelect: FC<OriginSelectProps> = ({ className = "", value, ...rest }) => {
    return (
        <select
            {...rest}
            value={value}
            className={classNames("w-full bg-slate-700 p-3 text-white", { [className]: className })}
        >
            <option value="" disabled={!value} className={classNames("text-slate-500", { "text-red-500": value })}>
                {value ? "Clear" : "Origin"}
            </option>
            {data.origins.map((o) => (
                <option key={o.code} value={o.name} className="text-lg">
                    {o.name}
                </option>
            ))}
        </select>
    );
};

export default memo(OriginSelect);
