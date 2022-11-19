import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import CurrentSubscriptionPage from "../components/pages/subscription/CurrentSubscriptionPage";
import PageLayout from "../layout/PageLayout";

export interface CurrentSubscriptionScreenProps extends ComponentProps<"div"> {}

const CurrentSubscriptionScreen: FC<CurrentSubscriptionScreenProps> = ({ className = "", ...rest }) => {
    return (
        <PageLayout>
            <div {...rest} className={classNames("p-8 sm:p-16", { [className]: className })}>
                <CurrentSubscriptionPage />
            </div>
        </PageLayout>
    );
};

export default CurrentSubscriptionScreen;
