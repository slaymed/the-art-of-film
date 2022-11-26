import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import Paragraph from "../../elements/Paragraph";
import RefetchButton from "../../kits/RefetchButton";
import { GiftSub } from "../../../store/subscription/types";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import dayjs from "dayjs";
import SubscriptionColorText from "../../kits/SubscriptionColorText";
import { Link } from "react-router-dom";
import { useDispatch } from "../../../hooks/useDispatch";
import { fetchCurrentSubscription } from "../../../store/subscription/thunks";

export interface CurrentGiftSubPageProps extends ComponentProps<"div"> {
    giftSub: GiftSub;
}

const CurrentGiftSubPage: FC<CurrentGiftSubPageProps> = ({ className = "", giftSub, ...rest }) => {
    const dispatch = useDispatch();

    const refetch = () => dispatch(fetchCurrentSubscription());

    if (!giftSub) return null;

    return (
        <div {...rest} className={classNames("flex flex-col gap-8", { [className]: className })}>
            <div className="flex items-center justify-between flex-wrap">
                <Paragraph className="text-accent text-lg sm:text-xl font-bold tracking-widest uppercase">
                    Current Subscription
                </Paragraph>
                <RefetchButton onClick={refetch} />
            </div>
            <div className="flex space-x-4 items-center">
                <div className="w-14 h-14 flex-shrink-0 rounded-md">
                    <div className="rounded-full bg-accent/20 p-1 border-2 border-accent/10">
                        <CircularProgressbar
                            value={giftSub.progress_percentage}
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
                        {giftSub.targeted_sub && (
                            <SubscriptionColorText
                                sub={giftSub.targeted_sub}
                                text={giftSub.targeted_sub.name}
                                className="text-lg font-bold tracking-wider uppercase"
                            />
                        )}
                        {giftSub.gift && (
                            <Paragraph className="text-sm hidden sm:block capitalize py-0.5 px-2 rounded tracking-wider font-bold text-blue-500 bg-blue-500/20">
                                Gifted
                            </Paragraph>
                        )}
                        {giftSub.active && (
                            <Paragraph className="text-sm hidden sm:block capitalize py-0.5 px-2 rounded tracking-wider font-bold text-green-500 bg-green-500/20">
                                Active
                            </Paragraph>
                        )}
                        <Paragraph className="text-sm py-0.5 px-2 bg-slate-400/20 text-slate-400 rounded tracking-wide font-bold">
                            Cancels {dayjs(giftSub.cancel_at).format("MMM D, YYYY")}
                        </Paragraph>
                    </div>
                    <div className="flex gap-2 items-center text-slate-500 flex-wrap">
                        <Paragraph className="text-sm">Period of {giftSub.period_days} days</Paragraph>
                        <div className="w-1 h-1 rounded-full bg-slate-500" />
                        <Paragraph className="text-sm">{giftSub.rest_days} days left</Paragraph>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                <Paragraph className="text-slate-400 font-bold text-sm uppercase tracking-wider">
                    Last Gift From
                </Paragraph>
                {giftSub.gift && (
                    <Link to={`/seller/${giftSub.gift.buyer._id}`}>
                        <Paragraph className="text-accent underline underline-offset-2 font-bold text-sm uppercase tracking-wider">
                            {giftSub.gift.buyer.name}
                        </Paragraph>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CurrentGiftSubPage;
