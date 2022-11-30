import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "react-circular-progressbar/dist/styles.css";

import { currentSubscription, fetchingCurrentSub } from "../../../store/subscription/selectors";
import { Period } from "../../../store/enums";
import { SubscriptionStatus } from "../../../store/subscription/enums";
import { fetchCurrentSubscription } from "../../../store/subscription/thunks";

import CurrencyConvert from "../../kits/CurrencyConvert";
import LoadingBox from "../../kits/LoadingBox";
import SubStatusBadge from "../../kits/SubStatusBadge";
import SubDateShow from "../../kits/SubDateShow";
import ErrorWithRedirect from "../../kits/ErrorWithRedirect";
import RefetchButton from "../../kits/RefetchButton";
import NextSubPage from "./NextSubPage";
import Paragraph from "../../elements/Paragraph";
import SubscriptionColorText from "../../kits/SubscriptionColorText";
import CurrentGiftSubPage from "./CurrentGiftSubPage";

import { useDispatch } from "../../../hooks/useDispatch";

export interface CurrentSubscriptionPageProps extends ComponentProps<"div"> {
    showErrors?: boolean;
}

const CurrentSubscriptionPage: FC<CurrentSubscriptionPageProps> = ({ className = "", showErrors = true, ...rest }) => {
    const dispatch = useDispatch();

    const sub = useSelector(currentSubscription);
    const { loading, errors } = useSelector(fetchingCurrentSub);

    const refetch = () => dispatch(fetchCurrentSubscription());

    if (loading) return <LoadingBox className="!text-lg" />;
    if (errors.message && showErrors) return <ErrorWithRedirect errors={errors} loading={loading} />;

    if (!sub) return null;

    if (sub.giftSub) return <CurrentGiftSubPage giftSub={sub.giftSub} />;

    return (
        <div {...rest} className={classNames("flex flex-col space-y-8", { [className]: className })}>
            {sub.sub_data && (
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between flex-wrap">
                        <Paragraph className="text-slate-400 text-lg sm:text-xl font-bold tracking-widest uppercase">
                            Current Subscription
                        </Paragraph>
                        <RefetchButton onClick={refetch} />
                    </div>
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
                            <div className="flex gap-2 items-center flex-wrap">
                                <SubscriptionColorText
                                    sub={sub.sub_data.sub}
                                    text={sub.sub_data.sub.name}
                                    className="text-lg font-bold tracking-wider text-slate-400 uppercase"
                                />
                                <SubStatusBadge sub={sub.sub_data} className="hidden sm:block" />
                                <SubDateShow sub={sub.sub_data} />
                            </div>
                            <div className="flex gap-2 items-center text-slate-500 flex-wrap">
                                <Paragraph className="text-sm">
                                    Billing {sub.sub_data.billing === Period.MONETH && "Monthly"}
                                    {sub.sub_data.billing === Period.YEAR && "Yearly"}
                                </Paragraph>
                                <div className="w-1 h-1 rounded-full bg-slate-500 hidden sm:block" />
                                {sub.sub_data.cancel_at_period_end ? (
                                    <Paragraph className="text-sm hidden sm:block">No Future Invoices</Paragraph>
                                ) : (
                                    <Paragraph className="text-sm hidden sm:block">
                                        Next invoice on{" "}
                                        {dayjs(sub.sub_data.current_period_end * 1000).format("MMM D, YYYY")} for{" "}
                                        <CurrencyConvert amount={sub.sub_data.price} />
                                    </Paragraph>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {sub.invoice && (
                <div className="flex flex-col space-y-4">
                    <Paragraph className="text-slate-400 text-lg sm:text-xl font-bold tracking-widest uppercase">
                        Last Invoice
                    </Paragraph>
                    <div className="flex gap-4 items-center flex-wrap">
                        {sub.invoice.paid ? (
                            <Paragraph className="bg-green-500/20 text-green-500 py-0.5 px-2 rounded text-sm font-bold tracking-wider flex-shrink-0">
                                Paid
                            </Paragraph>
                        ) : sub.sub_data?.status === SubscriptionStatus.ACTIVE ? (
                            <Paragraph className="bg-slate-500/20 text-slate-500 py-0.5 px-2 rounded text-sm font-bold tracking-wider flex-shrink-0">
                                Invoice is waiting, It Will be paid after 1 hour
                            </Paragraph>
                        ) : (
                            <div className="flex space-x-2 items-center">
                                <Paragraph className="py-0.5 px-2 rounded bg-red-500/20 text-red-500 text-sm font-bold tracking-wider flex-shrink-0">
                                    Failed To Pay
                                </Paragraph>
                                <a href={sub.invoice.hosted_invoice_url} target="_blank" rel="noreferrer">
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
                                    <a href={sub.invoice.hosted_invoice_url} target="_blank" rel="noreferrer">
                                        <Paragraph className="underline select-none cursor-pointer text-accent underline-offset-2 text-sm line-clamp-1">
                                            Open Invoice
                                        </Paragraph>
                                    </a>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            <NextSubPage next_sub_data={sub.next_sub_data} />
        </div>
    );
};

export default CurrentSubscriptionPage;
