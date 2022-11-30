import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import { ITransaction } from "../../store/transactions/types";
import Paragraph from "../elements/Paragraph";

export interface TransactionStatusBadgeProps extends ComponentProps<"div"> {
    transaction: ITransaction;
}

const TransactionStatusBadge: FC<TransactionStatusBadgeProps> = ({ className = "", transaction, ...rest }) => {
    if (!transaction) return null;

    return (
        <div
            {...rest}
            className={classNames("text-slate-400 font-bold tracking-wider text-start", {
                [className]: className,
                "!text-blue-500": transaction.collected && !transaction.released && !transaction.refunded,
                "!text-green-500": transaction.released && transaction.collected && !transaction.refunded,
                "!text-rose-500": transaction.refunded && transaction.collected,
            })}
        >
            {transaction.collected && !transaction.released && !transaction.refunded && <Paragraph>Pending</Paragraph>}
            {transaction.released && transaction.collected && !transaction.refunded && <Paragraph>Success</Paragraph>}
            {transaction.refunded && transaction.collected && <Paragraph>Refunded</Paragraph>}
        </div>
    );
};

export default TransactionStatusBadge;
