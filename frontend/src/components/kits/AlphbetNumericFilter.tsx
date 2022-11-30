import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import FilterCard from "../cards/FilterCard";

export interface AlphbetNumericFilterProps extends ComponentProps<"div"> {
    filter: string;
    updateFilter: (filter: string) => void;
}

const AlphbetNumericFilter: FC<AlphbetNumericFilterProps> = ({
    className = "",
    updateFilter,
    filter = "All",
    ...rest
}) => {
    return (
        <div {...rest} className={classNames("w-fit flex flex-wrap gap-3", { [className]: className })}>
            <FilterCard alphabet="All" filter={filter} onClick={() => updateFilter("All")} />
            {Array.from(Array(26).keys()).map((index) => (
                <FilterCard
                    key={index}
                    alphabet={String.fromCharCode(index + 65)}
                    filter={filter}
                    onClick={() => updateFilter(String.fromCharCode(index + 65))}
                />
            ))}
            <FilterCard alphabet="0..9" filter={filter} onClick={() => updateFilter("0..9")} />
        </div>
    );
};

export default AlphbetNumericFilter;
