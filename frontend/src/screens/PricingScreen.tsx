import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import HeroSection from "../components/sections/HeroSection";
import SubscriptionPage from "../components/pages/subscription/SubscriptionPage";
import FAQPage from "../components/pages/FAQPage";

export interface PricingScreenProps extends ComponentProps<"div"> {}

const PricingScreen: FC<PricingScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("flex flex-col", { [className]: className })}>
            <HeroSection
                heading="SUBSCRIPTIONS"
                heading2="HOME / SUBSCRIPTIONS"
                showSearch={false}
                image="/images/Optimized-AoF-Banner-Raw.jpg"
            />
            <SubscriptionPage />
            <FAQPage header={false} subscriptionFAQsOnly />
        </div>
    );
};

export default PricingScreen;
