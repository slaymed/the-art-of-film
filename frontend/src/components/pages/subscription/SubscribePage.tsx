import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Paragraph from "../../elements/Paragraph";
import LoadingBox from "../../kits/LoadingBox";
import MessageBox from "../../kits/MessageBox";
import ErrorWithRedirect from "../../kits/ErrorWithRedirect";

import { user } from "../../../store/auth/selectors";
import {
    fetchingAvailableSubscriptions,
    selectSubScriptionById,
    subscribing,
} from "../../../store/subscription/selectors";
import SubscriptionCard from "../../cards/SubscriptionCard";

export interface SubscribePageProps extends ComponentProps<"div"> {}

const SubscribePage: FC<SubscribePageProps> = ({ className = "", ...rest }) => {
    const { subscriptionId } = useParams();

    const sub = useSelector(selectSubScriptionById(subscriptionId));
    const fetching = useSelector(fetchingAvailableSubscriptions);
    const userInfo = useSelector(user);
    const { loading, errors } = useSelector(subscribing);

    if (fetching.loading) return <LoadingBox className="!text-lg" />;
    if (fetching.errors.message) return <MessageBox>{fetching.errors.message}</MessageBox>;
    if (!sub || !userInfo) return null;

    return (
        <div {...rest} className={classNames("flex flex-col space-y-8", { [className]: className })}>
            <Paragraph className="text-lg sm:text-xl uppercase text-slate-400 tracking-widest font-bold">
                Subscribe
            </Paragraph>

            <SubscriptionCard sub={sub} user={userInfo} />

            <div className="flex items-center flex-wrap gap-3">
                <Paragraph className="text-sm uppercase text-slate-400 tracking-widest font-bold">
                    have a gift code?
                </Paragraph>
                <Link to="/redeem-gift-sub">
                    <Paragraph className="text-sm uppercase tracking-wider underline underline-offset-2 text-accent">
                        Redeem
                    </Paragraph>
                </Link>
            </div>

            <ErrorWithRedirect loading={loading} errors={errors} />
        </div>
    );
};

export default SubscribePage;
