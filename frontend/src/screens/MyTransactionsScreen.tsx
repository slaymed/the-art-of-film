import React, { FC, ComponentProps, useEffect, Fragment } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { fetchingMyTransactions, incomeTransactions, myTransactions } from "../store/transactions/selectors";
import TextHeader from "../components/elements/TextHeader";
import PageLayout from "../layout/PageLayout";
import { useDispatch } from "../hooks/useDispatch";
import { fetchMyTransactions } from "../store/transactions/thunks";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import TransactionsList from "../components/transaction-components/lists/TransactionsList";
import { Tab } from "@headlessui/react";
import Paragraph from "../components/elements/Paragraph";
import { useSearchParams } from "react-router-dom";

export interface MyTransactionsScreenProps extends ComponentProps<"div"> {}

const MyTransactionsScreen: FC<MyTransactionsScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const [sp, setSp] = useSearchParams();

    const transactions = useSelector(myTransactions);
    const income = useSelector(incomeTransactions);
    const fetching = useSelector(fetchingMyTransactions);

    useEffect(() => {
        dispatch(fetchMyTransactions());
    }, [dispatch]);

    return (
        <PageLayout>
            <div {...rest} className={classNames("flex flex-col p-8 gap-8 sm:p-16", { [className]: className })}>
                <TextHeader className="text-accent tracking-widest text-3xl">Transactions</TextHeader>

                {fetching.loading && <LoadingBox />}
                <ErrorWithRedirect {...fetching} />

                {!fetching.loading && (
                    <Tab.Group
                        as="div"
                        className="flex flex-col space-y-8"
                        selectedIndex={sp.get("pannel") === "income" ? 1 : 0}
                    >
                        <Tab.List className="bg-dark-card p-1.5 flex space-x-1.5 items-center">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        onClick={() => setSp({ pannel: "payments" })}
                                        className={classNames("px-6 py-2 duration-200 w-full", {
                                            "text-black bg-accent font-bold": selected,
                                        })}
                                    >
                                        <Paragraph>Payments</Paragraph>
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        onClick={() => setSp({ pannel: "income" })}
                                        className={classNames("px-6 py-2 duration-200 w-full", {
                                            "text-black bg-accent font-bold": selected,
                                        })}
                                    >
                                        <Paragraph>Income</Paragraph>
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <TransactionsList transactions={transactions} />
                            </Tab.Panel>
                            <Tab.Panel>
                                <TransactionsList transactions={income} />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                )}
            </div>
        </PageLayout>
    );
};

export default MyTransactionsScreen;
