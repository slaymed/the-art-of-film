import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";

import SponsoredLinksSection from "./SponsoredLinksSection";
import AdvertorialsSection from "./AdvertorialsSection";
import { visibleAdvertorials, visibleSponsoredLinks } from "../../../store/advertisements/selectors";
import { useSelector } from "react-redux";

export interface CombinedAdsSectionProps extends ComponentProps<"div"> {
    flex: "row" | "column";
    showadverts?: number;
    showLinks?: number;
    sizeClasses?: string;
}

const CombinedAdsSection: FC<CombinedAdsSectionProps> = ({
    className = "",
    flex = "column",
    showadverts = 3,
    showLinks = 3,
    sizeClasses,
    ...rest
}) => {
    const links = useSelector(visibleSponsoredLinks);
    const advertorials = useSelector(visibleAdvertorials);

    const noData = !links && !advertorials;
    const empty = noData || (links.length === 0 && advertorials.length === 0);

    return (
        <div
            {...rest}
            className={classNames("flex items-center justify-center flex-wrap h-fit p-8 overflow-x-auto scroll-bar", {
                [className]: className,
                "flex-col gap-8": flex === "column",
                "flex-row gap-16": flex === "row",
                "!hidden": empty,
            })}
        >
            <SponsoredLinksSection flex={flex} show={showLinks} sizeClasses={sizeClasses} />
            <AdvertorialsSection flex={flex} show={showadverts} sizeClasses={sizeClasses} />
        </div>
    );
};

export default memo(CombinedAdsSection);
