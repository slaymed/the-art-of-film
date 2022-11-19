import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import Paragraph from "../../elements/Paragraph";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    currentSubscription,
    fetchingAvailableSubscriptions,
    selectSubScriptionById,
    subscribing,
} from "../../../store/subscription/selectors";
import LoadingBox from "../../kits/LoadingBox";
import { GOLD, PLATINUM, SILVER } from "../../../store/subscription/constants";
import CurrencyConvert from "../../kits/CurrencyConvert";
import { user } from "../../../store/auth/selectors";
import Button from "../../elements/Button";
import SubStatusBadge from "../../kits/SubStatusBadge";
import MessageBox from "../../kits/MessageBox";
import { useDispatch } from "../../../hooks/useDispatch";
import { subscribe } from "../../../store/subscription/thunks";
import { Period } from "../../../store/enums";
import ErrorWithRedirect from "../../kits/ErrorWithRedirect";

export interface SubscribePageProps extends ComponentProps<"div"> {}

const SubscribePage: FC<SubscribePageProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const { subscriptionId } = useParams();

    const sub = useSelector(selectSubScriptionById(subscriptionId));
    const fetching = useSelector(fetchingAvailableSubscriptions);
    const currentSub = useSelector(currentSubscription);
    const userInfo = useSelector(user);
    const { loading, errors } = useSelector(subscribing);

    if (fetching.loading) return <LoadingBox className="!text-lg" />;
    if (fetching.errors.message) return <MessageBox>{fetching.errors.message}</MessageBox>;
    if (!sub || !userInfo) return null;

    const monthly = () => dispatch(subscribe({ subscriptionId: sub._id, charge_period: Period.MONETH }));
    const yearly = () => dispatch(subscribe({ subscriptionId: sub._id, charge_period: Period.YEAR }));

    return (
        <div {...rest} className={classNames("flex flex-col space-y-8", { [className]: className })}>
            <Paragraph className="text-lg sm:text-xl uppercase text-accent tracking-widest font-bold">
                Subscribe
            </Paragraph>

            <div className="bg-dark-card p-8 flex flex-wrap gap-8 w-fit">
                <div className="flex flex-shrink-0 flex-col space-y-4">
                    <Paragraph
                        className={classNames("capitalize text-accent tracking-widest font-bold", {
                            "text-slate-400": sub.name === SILVER,
                            "text-accent": sub.name === GOLD,
                            "text-cyan-500": sub.name === PLATINUM,
                        })}
                    >
                        Subscription Name
                    </Paragraph>
                    <Paragraph
                        className={classNames(
                            "text-sm py-0.5 px-2 rounded w-fit capitalize tracking-widest font-bold",
                            {
                                "text-slate-400 bg-slate-400/20": sub.name === SILVER,
                                "text-accent bg-accent/20": sub.name === GOLD,
                                "text-cyan-500 bg-cyan-500/20": sub.name === PLATINUM,
                            }
                        )}
                    >
                        {sub.name}
                    </Paragraph>
                </div>
                <div className="flex flex-shrink-0 flex-col space-y-4">
                    <Paragraph className="capitalize text-cyan-500 tracking-widest font-bold">Month Price</Paragraph>
                    <Paragraph className="text-sm py-0.5 text-cyan-500 bg-cyan-500/20 px-2 rounded w-fit capitalize tracking-widest font-bold">
                        <CurrencyConvert amount={sub.monthPrice} />
                    </Paragraph>
                </div>
                <div className="flex flex-shrink-0 flex-col space-y-4">
                    <Paragraph className="capitalize text-cyan-500 tracking-widest font-bold">Year Price</Paragraph>
                    <Paragraph className="text-sm py-0.5 text-cyan-500 bg-cyan-500/20 px-2 rounded w-fit capitalize tracking-widest font-bold">
                        <CurrencyConvert amount={sub.yearPrice} />
                    </Paragraph>
                </div>

                <div className="flex flex-shrink-0 flex-col space-y-4">
                    <Paragraph className="capitalize text-blue-500 tracking-widest font-bold">Free Trail</Paragraph>
                    <Paragraph className="text-sm py-0.5 text-blue-500 bg-blue-500/20 px-2 rounded w-fit capitalize tracking-widest font-bold">
                        {userInfo.trialUsed ? "Benefited" : "1 Month"}
                    </Paragraph>
                </div>

                <div className="flex flex-shrink-0 flex-col space-y-4 group">
                    <div className="flex space-x-2 items-center">
                        <Paragraph className="capitalize text-slate-500 tracking-widest font-bold">Perks</Paragraph>
                        <Paragraph className="text-xs text-pink-500 w-fit capitalize group-hover:hidden">
                            hover to see more...
                        </Paragraph>
                    </div>
                    <Paragraph className="text-sm py-0.5 text-slate-500 bg-slate-500/20 px-2 rounded w-fit capitalize tracking-widest font-bold">
                        2 Month Free With Yearly Subscription
                    </Paragraph>
                    {sub.perks.map((perk) => (
                        <Paragraph
                            key={perk}
                            className="text-sm hidden group-hover:block py-0.5 text-slate-500 bg-slate-500/20 px-2 rounded w-fit capitalize tracking-widest font-bold"
                        >
                            {perk}
                        </Paragraph>
                    ))}
                </div>

                {sub._id === currentSub?.sub_data.sub._id && (
                    <div className="flex flex-shrink-0 flex-col space-y-4">
                        <Paragraph className="capitalize text-green-500 tracking-widest font-bold">Status</Paragraph>
                        <SubStatusBadge sub={currentSub.sub_data} showTrial />
                    </div>
                )}

                <div className="flex flex-shrink-0 flex-col space-y-4">
                    <Paragraph className="capitalize text-accent tracking-widest font-bold">Subscribe</Paragraph>
                    {loading ? (
                        <LoadingBox className="!text-sm" />
                    ) : (
                        <div className="flex space-x-4 items-center">
                            <Button type="button" onClick={monthly}>
                                <Paragraph className="text-sm underline underline-offset-2 bg-accent/30 text-accent hover:bg-accent hover:text-black duration-200 rounded py-0.5 px-2 w-fit capitalize tracking-widest font-bold">
                                    Monthly
                                </Paragraph>
                            </Button>
                            <Button type="button" onClick={yearly}>
                                <Paragraph className="text-sm underline underline-offset-2 bg-accent/30 text-accent hover:bg-accent hover:text-black duration-200 rounded py-0.5 px-2 w-fit capitalize tracking-widest font-bold">
                                    Yearly
                                </Paragraph>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <ErrorWithRedirect loading={loading} errors={errors} />
        </div>
    );
};

export default SubscribePage;
