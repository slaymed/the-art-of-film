import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import dayjs from "dayjs";

import Paragraph from "../../elements/Paragraph";
import TransactionStatusBadge from "../../kits/TransactionStatusBadge";

import { ITransaction } from "../../../store/transactions/types";

export interface TransactionsListProps extends ComponentProps<"div"> {
    transactions: ITransaction[];
}

const TransactionsList: FC<TransactionsListProps> = ({ className = "", transactions, ...rest }) => {
    if (!Array.isArray(transactions)) return null;
    if (transactions.length === 0) return <Paragraph className="text-2xl">No Transaction Yet</Paragraph>;

    return (
        <div
            {...rest}
            className={classNames("w-full text-xs md:text-sm overflow-auto scroll-bar uppercase", {
                [className]: className,
            })}
        >
            <table className="w-[600px] md:w-full ">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>
                            <Paragraph className="text-start text-sm py-6 px-1 tracking-wider text-slate-300">
                                Paid To
                            </Paragraph>
                        </th>
                        <th>
                            <Paragraph className="text-start text-sm py-6 px-1 tracking-wider text-slate-300">
                                Status
                            </Paragraph>
                        </th>
                        <th>
                            <Paragraph className="text-start text-sm py-6 px-1 tracking-wider text-slate-300">
                                Amount (GBP)
                            </Paragraph>
                        </th>
                        <th>
                            <Paragraph className="text-start text-sm py-6 px-1 tracking-wider text-slate-300">
                                Fees (GBP)
                            </Paragraph>
                        </th>
                        <th>
                            <Paragraph className="text-start text-sm py-6 px-1 tracking-wider text-slate-300">
                                Type
                            </Paragraph>
                        </th>
                        <th>
                            <Paragraph className="text-start text-sm py-6 px-1 tracking-wider text-slate-300">
                                Collected At
                            </Paragraph>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>
                                <div className="py-3 px-1">
                                    <Paragraph
                                        className={classNames("text-start text-slate-400 line-clamp-1", {
                                            "!text-accent rounded italic w-fit pr-1 font-bold tracking-wider":
                                                !transaction.to,
                                        })}
                                    >
                                        {transaction.to ? transaction.to.name : "AoF Company"}
                                    </Paragraph>
                                </div>
                            </td>
                            <td>
                                <div className="py-3 px-1">
                                    <TransactionStatusBadge transaction={transaction} />
                                </div>
                            </td>
                            <td>
                                <div className="py-3 px-1">
                                    <Paragraph className="text-start tracking-wider text-slate-400">
                                        £ {transaction.total_release_amount_after_fee.toFixed(2)}
                                    </Paragraph>
                                </div>
                            </td>
                            <td>
                                <div className="py-3 px-1">
                                    <Paragraph className="text-start tracking-wider text-slate-400">
                                        £ {transaction.total_commission_fee.toFixed(2)}
                                    </Paragraph>
                                </div>
                            </td>
                            <td>
                                <div className="py-3 px-1">
                                    <Paragraph className="text-start tracking-wider text-slate-400">
                                        {transaction.type}
                                    </Paragraph>
                                </div>
                            </td>
                            <td>
                                <div className="py-3 px-1">
                                    {transaction.collected_at && (
                                        <Paragraph className="text-start tracking-wider text-slate-400">
                                            {dayjs(transaction.collected_at).format("MMM D, YYYY")}
                                        </Paragraph>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsList;
