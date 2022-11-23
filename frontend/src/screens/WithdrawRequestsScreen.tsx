import React, { FC, ComponentProps, Fragment, useEffect, useState } from "react";
import classNames from "classnames";
import { Tab } from "@headlessui/react";
import { Link, useSearchParams } from "react-router-dom";

import { WithdrawStatus } from "../store/withdraw-requests/enums";
import { fetchWithdrawRequests } from "../store/withdraw-requests/thunks";

import PageLayout from "../layout/PageLayout";
import Paragraph from "../components/elements/Paragraph";
import PendingWithdrawRequestsList from "../components/lists/withdrawRequests/PendingWithdrawRequestsList";
import PaidWithdrawRequestsList from "../components/lists/withdrawRequests/PaidWithdrawRequestsList";
import RejectedWithdrawRequestsList from "../components/lists/withdrawRequests/RejectedWithdrawRequestsList";
import RefetchButton from "../components/kits/RefetchButton";

import { useDispatch } from "../hooks/useDispatch";

export interface WithdrawRequestsScreenProps extends ComponentProps<"div"> {}

const WithdrawRequestsScreen: FC<WithdrawRequestsScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const [usp, setUsp] = useSearchParams();
    const pannel = (usp.get("pannel") || WithdrawStatus.PENDING) as WithdrawStatus;

    const [tabIndex, setTabIndex] = useState(0);

    const refetch = () => dispatch(fetchWithdrawRequests());

    useEffect(() => {
        switch (pannel) {
            case WithdrawStatus.PENDING:
                setTabIndex(0);
                break;
            case WithdrawStatus.PAID:
                setTabIndex(1);
                break;
            case WithdrawStatus.REJECTED:
                setTabIndex(2);
                break;
            default:
                setTabIndex(0);
        }
    }, [pannel]);

    return (
        <PageLayout>
            <div
                {...rest}
                className={classNames("flex flex-col gap-8 sm:gap-16 p-8 sm:p-16 bg-light-dark", {
                    [className]: className,
                })}
            >
                <div className="flex items-center justify-between flex-wrap">
                    <Paragraph className="text-2xl sm:text-3xl uppercase tracking-widest font-bold text-accent">
                        Withdraw Requests
                    </Paragraph>
                    <div className="flex items-center gap-4">
                        <RefetchButton onClick={refetch} />
                        <Link to="/new-withdraw-request">
                            <Paragraph className="text-sm underline underline-offset-2 text-accent">
                                New Withdraw Request
                            </Paragraph>
                        </Link>
                    </div>
                </div>

                <Tab.Group as="div" className="w-full flex flex-col gap-8" selectedIndex={tabIndex}>
                    <Tab.List className="w-full flex items-center bg-dark-card">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    type="button"
                                    onClick={() => setUsp({ pannel: WithdrawStatus.PENDING })}
                                    className={classNames("w-full py-3 px-6", {
                                        "bg-accent text-black": selected,
                                    })}
                                >
                                    <Paragraph className="font-bold tracking-widest text-sm uppercase">
                                        Pending
                                    </Paragraph>
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    type="button"
                                    onClick={() => setUsp({ pannel: WithdrawStatus.PAID })}
                                    className={classNames("w-full py-3 px-6", {
                                        "bg-green-500 text-white ": selected,
                                    })}
                                >
                                    <Paragraph className="font-bold tracking-widest text-sm uppercase">Paid</Paragraph>
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    type="button"
                                    onClick={() => setUsp({ pannel: WithdrawStatus.REJECTED })}
                                    className={classNames("w-full py-3 px-6", {
                                        "bg-red-600 text-white": selected,
                                    })}
                                >
                                    <Paragraph className="font-bold tracking-widest text-sm uppercase">
                                        Rejected
                                    </Paragraph>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <PendingWithdrawRequestsList />
                        </Tab.Panel>
                        <Tab.Panel>
                            <PaidWithdrawRequestsList />
                        </Tab.Panel>
                        <Tab.Panel>
                            <RejectedWithdrawRequestsList />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </PageLayout>
    );
};

export default WithdrawRequestsScreen;
