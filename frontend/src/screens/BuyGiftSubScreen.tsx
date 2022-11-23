import React, { FC, ComponentProps, useState } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Paragraph from "../components/elements/Paragraph";
import TextHeader from "../components/elements/TextHeader";
import SubscriptionCard from "../components/cards/SubscriptionCard";
import LoadingBox from "../components/kits/LoadingBox";
import Button from "../components/elements/Button";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import { useDispatch } from "../hooks/useDispatch";

import { Period, RequestLifeCycle } from "../store/enums";
import { user } from "../store/auth/selectors";
import { buyingGift } from "../store/gifts/selectors";
import { buyGiftSub } from "../store/gifts/thunks";
import { GlobalMessage, ThunkResponseType } from "../store/types";
import { IGift } from "../store/gifts/types";
import { createGiftSubSession } from "../store/stripe/thunks";
import { creatingSession } from "../store/stripe/selectors";
import { ISession } from "../store/stripe/types";
import { fetchingAvailableSubscriptions, selectSubScriptionById } from "../store/subscription/selectors";

export interface BuyGiftSubScreenProps extends ComponentProps<"div"> {}

const BuyGiftSubScreen: FC<BuyGiftSubScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const { subscriptionId } = useParams();

    const sub = useSelector(selectSubScriptionById(subscriptionId));
    const userInfo = useSelector(user);
    const { loading } = useSelector(fetchingAvailableSubscriptions);
    const buying = useSelector(buyingGift);
    const sessionOperation = useSelector(creatingSession);

    const [period, setPeriod] = useState<Period>(Period.MONETH);

    const buy = async () => {
        if (!subscriptionId) return;

        const res = await dispatch(buyGiftSub({ targeted_sub_id: subscriptionId, period: Period.MONETH }));
        const { status, data: gift } = res.payload as ThunkResponseType<IGift, GlobalMessage>;
        if (status !== RequestLifeCycle.SUCCESS || !gift) return;

        const sessionRes = await dispatch(createGiftSubSession(gift._id));
        const sessionPayload = sessionRes.payload as ThunkResponseType<ISession, GlobalMessage>;
        if (sessionPayload.status !== RequestLifeCycle.SUCCESS || !sessionPayload.data) return;

        window.open(sessionPayload.data.url, "_blank");
    };

    if (!userInfo) return null;

    return (
        <div
            {...rest}
            className={classNames("p-8 sm:p-16 flex gap-8 bg-light-dark sm:gap-16 flex-col", {
                [className]: className,
            })}
        >
            {loading && <LoadingBox className="mx-auto" />}

            {!sub && !loading && (
                <TextHeader className="text-3xl">
                    <span className="text-accent">Subscription</span> not found
                </TextHeader>
            )}

            {sub && (
                <div className="flex gap-8 flex-col">
                    <Paragraph className="text-3xl font-bold uppercase tracking-widest text-accent">
                        Subscription
                    </Paragraph>

                    <SubscriptionCard sub={sub} user={userInfo} showActions={false} />

                    <ErrorWithRedirect {...buying} />

                    <div className="flex items-center gap-4">
                        <select
                            value={period}
                            className="bg-slate-700 rounded text-sm px-2 py-1.5 text-white/80"
                            onChange={({ target }) => setPeriod(target.value as Period)}
                        >
                            <option value={Period.MONETH}>Monthly</option>
                            <option value={Period.YEAR}>Yearly</option>
                        </select>

                        {buying.loading || sessionOperation.loading ? (
                            <LoadingBox />
                        ) : (
                            <Button type="button" onClick={buy}>
                                <div className="flex items-center gap-4 text-accent">
                                    <span>
                                        <i className="text-xl fa-solid fa-gift" />
                                    </span>
                                    <Paragraph className="duration-200 rounded underline underline-offset-2 w-fit capitalize tracking-widest font-bold">
                                        Buy Gift
                                    </Paragraph>
                                </div>
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyGiftSubScreen;
