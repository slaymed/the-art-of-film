import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";

import { prices } from "../../utils";

import CurrencyConvert from "./CurrencyConvert";

export interface PriceSelectProps extends ComponentProps<"select"> {}

const PriceSelect: FC<PriceSelectProps> = ({ className = "", value, ...rest }) => {
    return (
        <select
            {...rest}
            value={value}
            className={classNames("w-full bg-slate-700 p-3 text-white", { [className]: className })}
        >
            <option value="" disabled={!value} className={classNames("text-slate-500", { "text-red-500": value })}>
                {value ? "Clear" : "Price"}
            </option>
            {prices.map((p) => (
                <option key={p.name} value={`${p.min}-${p.max}`} className="text-lg">
                    <CurrencyConvert amount={p.min} /> - <CurrencyConvert amount={p.max} />
                </option>
            ))}
        </select>
    );
};

export default memo(PriceSelect);
