import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import CreditCardsPage from "../components/pages/payment/CreditCardsPage";

export interface CreditCardsScreenProps extends ComponentProps<"div"> {}

const CreditCardsScreen: FC<CreditCardsScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("p-8 sm:p-16 bg-light-dark", { [className]: className })}>
            <CreditCardsPage />
        </div>
    );
};

export default CreditCardsScreen;
