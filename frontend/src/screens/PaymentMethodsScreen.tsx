import React, { FC, ComponentProps, Fragment, useCallback } from "react";
import classNames from "classnames";
import { Tab } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";

import BankAccountsPage from "../components/pages/payment/BankAccountsPage";
import CreditCardsPage from "../components/pages/payment/CreditCardsPage";
import Paragraph from "../components/elements/Paragraph";

export interface PaymentMethodsScreenProps extends ComponentProps<"div"> {}

const PaymentMethodsScreen: FC<PaymentMethodsScreenProps> = ({ className = "", ...rest }) => {
    const [urlSearchParams, setSearchParams] = useSearchParams();

    const updateSearchParams = useCallback(
        (value: string) => {
            setSearchParams((prev) => ({ ...prev, pannel: value }));
        },
        [setSearchParams]
    );

    return (
        <div {...rest} className={classNames("p-8 sm:p-16 bg-light-dark", { [className]: className })}>
            <Tab.Group
                as="div"
                className="flex flex-col space-y-8"
                defaultIndex={urlSearchParams.get("pannel") === "banks" ? 0 : 1}
            >
                <Tab.List className="bg-dark-card p-1.5 flex space-x-1.5 items-center sm:w-max">
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                onClick={() => updateSearchParams("banks")}
                                className={classNames("px-6 py-2 duration-200 w-full sm:w-auto", {
                                    "text-black bg-accent font-bold": selected,
                                })}
                            >
                                <Paragraph>Bank Accounts</Paragraph>
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                onClick={() => updateSearchParams("credit-cards")}
                                className={classNames("px-6 py-2 duration-200 w-full sm:w-auto", {
                                    "text-black bg-accent font-bold": selected,
                                })}
                            >
                                <Paragraph>Credit Cards</Paragraph>
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <BankAccountsPage />
                    </Tab.Panel>
                    <Tab.Panel>
                        <CreditCardsPage />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default PaymentMethodsScreen;
