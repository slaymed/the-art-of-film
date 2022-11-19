import React, { FC, ComponentProps, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { availableSubscriptions, fetchingAvailableSubscriptions } from "../../../store/subscription/selectors";

import SubscriptionSwitch from "../../kits/SubscriptionSwitch";
import TextHeader from "../../elements/TextHeader";
import Packagecard from "../../cards/Packagecard";
import LoadingBox from "../../kits/LoadingBox";
import MessageBox from "../../kits/MessageBox";

export interface SubscriptionPageProps extends ComponentProps<"div"> {}

const SubscriptionPage: FC<SubscriptionPageProps> = ({ className = "", ...rest }) => {
    const { loading, errors } = useSelector(fetchingAvailableSubscriptions);
    const subs = useSelector(availableSubscriptions);

    const [annual, setAnnual] = useState(false);

    return (
        <div
            {...rest}
            className={classNames(" p-8 space-y-8 flex items-center flex-col sm:p-16 sm:space-y-16 bg-base", {
                [className]: className,
            })}
        >
            <TextHeader className="text-3xl sm:text-6xl text-center">
                SUBSCRIBE TO <span className="text-accent">THE ART OF FILM</span>
            </TextHeader>

            <div className="flex flex-col space-y-8 items-center w-full">
                <SubscriptionSwitch enabled={annual} setEnabled={setAnnual} />

                {errors.message && <MessageBox className="text-center">{errors.message}</MessageBox>}

                {loading ? (
                    <LoadingBox />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {subs.map((sub) => (
                            <Packagecard key={sub._id} sub={sub} annual={annual} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionPage;
