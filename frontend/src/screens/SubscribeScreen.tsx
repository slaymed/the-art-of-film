import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import SubscribePage from "../components/pages/subscription/SubscribePage";
import CurrentSubscriptionPage from "../components/pages/subscription/CurrentSubscriptionPage";

export interface SubscribeScreenProps extends ComponentProps<"div"> {}

const SubscribeScreen: FC<SubscribeScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames("p-8 sm:p-16 bg-light-dark space-y-8 sm:space-y-16", { [className]: className })}
        >
            <CurrentSubscriptionPage showErrors={false} />
            <SubscribePage />
        </div>
    );
};

export default SubscribeScreen;
