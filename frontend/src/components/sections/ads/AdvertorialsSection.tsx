import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { visibleAdvertorials } from "../../../store/advertisements/selectors";

import AdvertorialBox from "../../cards/AdvertorialBox";

export interface AdvertorialsSectionProps extends ComponentProps<"div"> {
    flex: "row" | "column";
    show: number;
    sizeClasses?: string;
}

const AdvertorialsSection: FC<AdvertorialsSectionProps> = ({
    className = "",
    flex = "column",
    show,
    sizeClasses,
    ...rest
}) => {
    const advertorials = useSelector(visibleAdvertorials);

    if (!advertorials || advertorials.length === 0) return null;

    return (
        <div
            {...rest}
            className={classNames("flex w-fit items-center justify-center flex-wrap h-fit overflow-x-auto scroll-bar", {
                [className]: className,
                "flex-col gap-8": flex === "column",
                "flex-row gap-16": flex === "row",
            })}
        >
            {advertorials.slice(0, show).map((advertisement) => (
                <AdvertorialBox key={advertisement._id} advertisement={advertisement} sizeClasses={sizeClasses} />
            ))}
        </div>
    );
};

export default memo(AdvertorialsSection);
