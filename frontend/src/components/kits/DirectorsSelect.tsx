import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { directorsSelector } from "../../store/tags/selectors";

export interface DirectorsSelectProps extends ComponentProps<"select"> {}

const DirectorsSelect: FC<DirectorsSelectProps> = ({ className = "", value, ...rest }) => {
    const directors = useSelector(directorsSelector);

    return (
        <select
            {...rest}
            value={value}
            className={classNames("w-full bg-slate-700 p-3 text-white", { [className]: className })}
        >
            <option value="" disabled={!value} className={classNames("text-slate-500", { "text-red-500": value })}>
                {value ? "Clear" : "Directors"}
            </option>
            {directors.map((d) => (
                <option key={d._id} value={d.name} className="text-lg">
                    {d.name}
                </option>
            ))}
        </select>
    );
};

export default memo(DirectorsSelect);
