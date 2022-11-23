import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Paragraph from "../elements/Paragraph";
import Button from "../elements/Button";
import CurrencyConvert from "../kits/CurrencyConvert";
import LoadingBox from "../kits/LoadingBox";
import SubStatusBadge from "../kits/SubStatusBadge";

import { ISubscription } from "../../store/subscription/types";
import { GOLD, PLATINUM, SILVER } from "../../store/subscription/constants";
import { subscribe } from "../../store/subscription/thunks";
import { Period } from "../../store/enums";
import { currentSubscription, subscribing } from "../../store/subscription/selectors";
import { User } from "../../store/auth/types";

import { useDispatch } from "../../hooks/useDispatch";

export interface SubscriptionCardProps extends ComponentProps<"div"> {
    sub: ISubscription;
    user: User;
    showActions?: boolean;
}

const SubscriptionCard: FC<SubscriptionCardProps> = ({ className = "", sub, user, showActions = true, ...rest }) => {
    const dispatch = useDispatch();

    const currentSub = useSelector(currentSubscription);
    const { loading } = useSelector(subscribing);

    const monthly = () => dispatch(subscribe({ subscriptionId: sub._id, charge_period: Period.MONETH }));
    const yearly = () => dispatch(subscribe({ subscriptionId: sub._id, charge_period: Period.YEAR }));

    if (!sub) return null;

    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            <div className="bg-dark-card p-8 flex flex-wrap gap-8 w-fit">
                <div className="flex flex-col gap-4">
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
                <div className="flex flex-col gap-4">
                    <Paragraph className="capitalize text-cyan-500 tracking-widest font-bold">Month Price</Paragraph>
                    <Paragraph className="text-sm py-0.5 text-cyan-500 bg-cyan-500/20 px-2 rounded w-fit capitalize tracking-widest font-bold">
                        <CurrencyConvert amount={sub.monthPrice} />
                    </Paragraph>
                </div>
                <div className="flex flex-col gap-4">
                    <Paragraph className="capitalize text-cyan-500 tracking-widest font-bold">Year Price</Paragraph>
                    <Paragraph className="text-sm py-0.5 text-cyan-500 bg-cyan-500/20 px-2 rounded w-fit capitalize tracking-widest font-bold">
                        <CurrencyConvert amount={sub.yearPrice} />
                    </Paragraph>
                </div>

                <div className="flex flex-col gap-4">
                    <Paragraph className="capitalize text-blue-500 tracking-widest font-bold">Free Trail</Paragraph>
                    <Paragraph className="text-sm py-0.5 text-blue-500 bg-blue-500/20 px-2 rounded w-fit capitalize tracking-widest font-bold">
                        {user.trialUsed ? "Benefited" : "1 Month"}
                    </Paragraph>
                </div>

                <div className="flex flex-col gap-4 group">
                    <div className="flex space-x-2 items-center">
                        <Paragraph className="capitalize text-slate-500 tracking-widest font-bold">Perks</Paragraph>
                        <Paragraph className="text-xs text-pink-500 w-fit capitalize hidden sm:block group-hover:hidden">
                            hover to see more...
                        </Paragraph>
                    </div>
                    <Paragraph className="text-sm py-0.5 text-slate-500 bg-slate-500/20 px-2 rounded w-fit capitalize tracking-widest font-bold">
                        2 Month Free With Yearly Subscription
                    </Paragraph>
                    {sub.perks.map((perk) => (
                        <Paragraph
                            key={perk}
                            className="text-sm sm:hidden sm:group-hover:block py-0.5 text-slate-500 bg-slate-500/20 px-2 rounded w-fit capitalize tracking-widest font-bold"
                        >
                            {perk}
                        </Paragraph>
                    ))}
                </div>

                {sub._id === currentSub?.sub_data?.sub._id && (
                    <div className="flex flex-col gap-4">
                        <Paragraph className="capitalize text-green-500 tracking-widest font-bold">Status</Paragraph>
                        <SubStatusBadge sub={currentSub.sub_data} showTrial />
                    </div>
                )}

                {showActions && (
                    <div className="flex flex-col gap-4">
                        <Paragraph className="capitalize text-accent tracking-widest font-bold">Subscribe </Paragraph>
                        {loading ? (
                            <LoadingBox className="!text-sm" />
                        ) : (
                            <div className="flex gap-4 items-center flex-wrap">
                                <Button type="button" onClick={monthly}>
                                    <Paragraph className="text-sm underline underline-offset-2 bg-accent text-black duration-200 rounded py-0.5 px-2 w-fit capitalize tracking-widest font-bold">
                                        Monthly
                                    </Paragraph>
                                </Button>
                                <Button type="button" onClick={yearly}>
                                    <Paragraph className="text-sm underline underline-offset-2 bg-accent text-black duration-200 rounded py-0.5 px-2 w-fit capitalize tracking-widest font-bold">
                                        Yearly
                                    </Paragraph>
                                </Button>
                                <Link to={`/buy-gift-sub/${sub._id}`}>
                                    <div className="flex items-center gap-4 text-accent">
                                        <span>
                                            <i className="text-lg fa-solid fa-gift" />
                                        </span>
                                        <Paragraph className="text-sm duration-200 rounded underline underline-offset-2 w-fit capitalize tracking-widest font-bold">
                                            Buy as a Gift
                                        </Paragraph>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(SubscriptionCard);
