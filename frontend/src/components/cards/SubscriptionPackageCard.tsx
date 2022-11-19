import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import TextHeader from "../elements/TextHeader";

export interface SubscriptionPackageCardProps extends ComponentProps<"div"> {
    title: string;
    perks: string[];
    annual: boolean;
    yearPrice: number;
    monthPrice: number;
}

// TODO: continue
const SubscriptionPackageCard: FC<SubscriptionPackageCardProps> = ({ className = "", title, ...rest }) => {
    return (
        <div {...rest} className={classNames("flex flex-col w-full items-center", { [className]: className })}>
            <div className="bg-accent">
                <TextHeader className="text-3xl">{title}</TextHeader>
            </div>

            <div className="flex flex-col space-y-2 items-center p-8"></div>
        </div>
    );
};

export default SubscriptionPackageCard;
