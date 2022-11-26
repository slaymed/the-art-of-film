import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

export interface AdvertisementTransactionScreenProps extends ComponentProps<"div"> {}

const AdvertisementTransactionScreen: FC<AdvertisementTransactionScreenProps> = ({ className = "", ...rest }) => {
    // TODO: load transaction by advertisement id
    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            Advertisement Transaction
        </div>
    );
};

export default AdvertisementTransactionScreen;
