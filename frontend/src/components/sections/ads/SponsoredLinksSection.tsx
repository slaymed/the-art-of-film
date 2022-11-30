import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { visibleSponsoredLinks } from "../../../store/advertisements/selectors";

import SponsoredBox from "../../cards/SponsoredBox";

export interface SponsoredLinksSectionProps extends ComponentProps<"div"> {
    show: number;
    flex: "row" | "column";
    sizeClasses?: string;
}

const SponsoredLinksSection: FC<SponsoredLinksSectionProps> = ({
    className = "",
    flex = "column",
    show,
    sizeClasses,
    ...rest
}) => {
    const links = useSelector(visibleSponsoredLinks);

    if (!links || links.length === 0) return null;

    return (
        <div
            {...rest}
            className={classNames("flex w-fit items-center justify-center flex-wrap h-fit overflow-x-auto scroll-bar", {
                [className]: className,
                "flex-col gap-8": flex === "column",
                "flex-row gap-16": flex === "row",
            })}
        >
            {links.slice(0, show).map((advertisement) => (
                <SponsoredBox key={advertisement._id} advertisement={advertisement} sizeClasses={sizeClasses} />
            ))}
        </div>
    );
};

export default memo(SponsoredLinksSection);
