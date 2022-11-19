import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "react-circular-progressbar/dist/styles.css";

import { currentSubscription, fetchingCurrentSub } from "../../../store/subscription/selectors";
import { Period } from "../../../store/enums";

import CurrencyConvert from "../../kits/CurrencyConvert";
import LoadingBox from "../../kits/LoadingBox";
import SubStatusBadge from "../../kits/SubStatusBadge";
import SubDateShow from "../../kits/SubDateShow";
import Paragraph from "../../elements/Paragraph";
import NextSubPage from "./NextSubPage";
import ErrorWithRedirect from "../../kits/ErrorWithRedirect";
import { SubscriptionStatus } from "../../../store/subscription/enums";

export interface CurrentSubscriptionPageProps extends ComponentProps<"div"> {
    showErrors?: boolean;
}

const CurrentSubscriptionPage: FC<CurrentSubscriptionPageProps> = ({ className = "", showErrors = true, ...rest }) => {
    const sub = useSelector(currentSubscription);
    const { loading, errors } = useSelector(fetchingCurrentSub);

    if (loading) return <LoadingBox className="!text-lg" />;
    if (errors.message && showErrors) return <ErrorWithRedirect errors={errors} loading={loading} />;
    if (!sub) return null;

    return (
        <div {...rest} className={classNames("flex flex-col space-y-8", { [className]: className })}>
            <div className="flex flex-col space-y-4">
                <Paragraph className="text-accent text-lg sm:text-xl font-bold tracking-widest uppercase">
                    Current Subscription
                </Paragraph>
                <div className="flex space-x-4 items-center">
                    <div className="w-14 h-14 flex-shrink-0 rounded-md">
                        <div className="rounded-full bg-accent/20 p-1 border-2 border-accent/10">
                            <CircularProgressbar
                                value={sub.sub_data.progress_percentage ? sub.sub_data.progress_percentage : 1}
                                strokeWidth={50}
                                styles={buildStyles({
                                    strokeLinecap: "butt",
                                    pathColor: "#fab702",
                                    trailColor: "transparent",
                                })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="flex space-x-2 items-center">
                            <Paragraph className="text-lg font-bold tracking-wider text-slate-400 uppercase">
                                {sub.sub_data.sub.name}
                            </Paragraph>
                            <SubStatusBadge sub={sub.sub_data} />
                            <SubDateShow sub={sub.sub_data} />
                        </div>
                        <div className="flex space-x-2 items-center text-slate-500">
                            <Paragraph className="text-sm line-clamp-1">
                                Billing {sub.sub_data.billing === Period.MONETH && "Monthly"}
                                {sub.sub_data.billing === Period.YEAR && "Yearly"}
                            </Paragraph>
                            <div className="w-1 h-1 rounded-full bg-slate-500" />
                            {sub.sub_data.cancel_at_period_end ? (
                                <Paragraph className="text-sm line-clamp-1">No Future Invoices</Paragraph>
                            ) : (
                                <Paragraph className="text-sm line-clamp-1">
                                    Next invoice on{" "}
                                    {dayjs(sub.sub_data.current_period_end * 1000).format("MMM D, YYYY")} for{" "}
                                    <CurrencyConvert amount={sub.sub_data.price} />
                                </Paragraph>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-4">
                <Paragraph className="text-accent text-lg sm:text-xl font-bold tracking-widest uppercase">
                    Last Invoice
                </Paragraph>
                <div className="flex gap-4 items-center flex-wrap">
                    {sub.invoice.paid ? (
                        <Paragraph className="bg-green-500/20 text-green-500 py-0.5 px-2 rounded text-sm font-bold tracking-wider flex-shrink-0">
                            Paid
                        </Paragraph>
                    ) : sub.sub_data.status === SubscriptionStatus.ACTIVE ? (
                        <Paragraph className="bg-slate-500/20 text-slate-500 py-0.5 px-2 rounded text-sm font-bold tracking-wider flex-shrink-0">
                            Invoice is waiting, It Will be paid after 1 hour
                        </Paragraph>
                    ) : (
                        <div className="flex space-x-2 items-center">
                            <Paragraph className="py-0.5 px-2 rounded bg-red-500/20 text-red-500 text-sm font-bold tracking-wider flex-shrink-0">
                                Failed To Pay
                            </Paragraph>
                            <a href={sub.invoice.hosted_invoice_url} target="_blank">
                                <Paragraph className="underline select-none cursor-pointer text-accent underline-offset-2 text-sm line-clamp-1">
                                    Manual Paying
                                </Paragraph>
                            </a>
                        </div>
                    )}
                    {sub.invoice.paid && (
                        <>
                            <Paragraph className="bg-accent/20 text-accent py-0.5 px-2 rounded text-sm font-bold tracking-wider flex-shrink-0">
                                <CurrencyConvert amount={sub.invoice.amount_paid} />
                            </Paragraph>
                            {sub.invoice.invoice_pdf && (
                                <a href={sub.invoice.invoice_pdf} download>
                                    <Paragraph className="underline select-none cursor-pointer text-accent underline-offset-2 text-sm line-clamp-1">
                                        Download Pdf
                                    </Paragraph>
                                </a>
                            )}
                            {sub.invoice.hosted_invoice_url && (
                                <a href={sub.invoice.hosted_invoice_url} target="_blank">
                                    <Paragraph className="underline select-none cursor-pointer text-accent underline-offset-2 text-sm line-clamp-1">
                                        Open Invoice
                                    </Paragraph>
                                </a>
                            )}
                        </>
                    )}
                </div>
            </div>

            <NextSubPage next_sub_data={sub.next_sub_data} />
        </div>
    );
};

export default CurrentSubscriptionPage;