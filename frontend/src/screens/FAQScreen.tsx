import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import FAQPage from "../components/pages/FAQPage";
import CombinedAdsSection from "../components/sections/ads/CombinedAdsSection";

export interface FAQScreenProps extends ComponentProps<"div"> {}

const FAQScreen: FC<FAQScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            <FAQPage />
            <CombinedAdsSection flex="row" />
        </div>
    );
};

export default FAQScreen;
