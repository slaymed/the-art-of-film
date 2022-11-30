import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { castsSelector } from "../../store/tags/selectors";

export interface CastsSelectProps extends ComponentProps<"select"> {}

const CastsSelect: FC<CastsSelectProps> = ({ className = "", value, ...rest }) => {
    const casts = useSelector(castsSelector);

    return (
        <select
            {...rest}
            value={value}
            className={classNames("w-full bg-slate-700 p-3 text-white", { [className]: className })}
        >
            <option value="" disabled={!value} className={classNames("text-slate-500", { "text-red-500": value })}>
                {value ? "Clear" : "Casts"}
            </option>
            {casts.map((c) => (
                <option key={c._id} value={c.name}>
                    {c.name}
                </option>
            ))}
        </select>
    );
};

export default memo(CastsSelect);
