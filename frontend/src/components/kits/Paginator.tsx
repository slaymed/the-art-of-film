import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import FilterCard from "../cards/FilterCard";

export interface PaginatorProps extends ComponentProps<"div"> {
    show: number;
    page: number;
    count: number;
    onPagination: (page: number) => void;
}

const Paginator: FC<PaginatorProps> = ({ className = "", show, onPagination, page, count, ...rest }) => {
    if (show >= count) return null;

    return (
        <div
            {...rest}
            className={classNames("flex gap-4 flex-wrap justify-center items-center", { [className]: className })}
        >
            {Array.from(Array(Math.ceil(count / show)).keys()).map((pageNumber) => (
                <FilterCard
                    key={pageNumber}
                    alphabet={(pageNumber + 1).toString()}
                    filter={page.toString()}
                    onClick={() => onPagination(pageNumber + 1)}
                />
            ))}
        </div>
    );
};

export default Paginator;
