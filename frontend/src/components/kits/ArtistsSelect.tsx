import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { artistesSelector } from "../../store/tags/selectors";

export interface ArtistsSelectProps extends ComponentProps<"select"> {}

const ArtistsSelect: FC<ArtistsSelectProps> = ({ className = "", value, ...rest }) => {
    const artists = useSelector(artistesSelector);

    return (
        <select
            {...rest}
            value={value}
            className={classNames("w-full bg-slate-700 p-3 text-white", { [className]: className })}
        >
            <option value="" disabled={!value} className={classNames("text-slate-500", { "text-red-500": value })}>
                {value ? "Clear" : "Artists"}
            </option>
            {artists.map((a) => (
                <option key={a._id} value={a.name} className="text-lg">
                    {a.name}
                </option>
            ))}
        </select>
    );
};

export default memo(ArtistsSelect);
