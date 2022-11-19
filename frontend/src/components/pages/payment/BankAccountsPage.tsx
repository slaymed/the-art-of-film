import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import Paragraph from "../../elements/Paragraph";

export interface BankAccountsPageProps extends ComponentProps<"div"> {}

const BankAccountsPage: FC<BankAccountsPageProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            <Paragraph className="text-accent/80 text-center sm:text-start text-xm">
                We will support bank accounts payments very soon
            </Paragraph>
        </div>
    );
};

export default BankAccountsPage;
