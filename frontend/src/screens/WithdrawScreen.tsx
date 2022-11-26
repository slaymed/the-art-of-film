import React, { FC, ComponentProps, FormEvent, useState, Fragment, ChangeEvent, useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import { useNavigate, useSearchParams } from "react-router-dom";

import PageLayout from "../layout/PageLayout";
import Paragraph from "../components/elements/Paragraph";
import CurrencyInput from "../components/elements/CurrencyInput";
import Button from "../components/elements/Button";
import CurrencyConvert from "../components/kits/CurrencyConvert";
import MessageBox from "../components/kits/MessageBox";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";

import { currencySelector } from "../store/currency/selectors";
import { GBP } from "../store/currency/constants";
import {
    Bank_Account,
    Paypal_Account,
    WithdrawRequestErrors,
    WithdrawRequestsRes,
} from "../store/withdraw-requests/types";
import { addingWithdrawRequest } from "../store/withdraw-requests/selectors";
import { createWithdrawRequest } from "../store/withdraw-requests/thunks";
import { AccountType } from "../store/withdraw-requests/enums";
import { useDispatch } from "../hooks/useDispatch";
import { user } from "../store/auth/selectors";
import { User } from "../store/auth/types";
import { ThunkResponseType } from "../store/types";
import { RequestLifeCycle } from "../store/enums";
import { fireUserUpdated_RT } from "../store/auth/actions";

const bankAccountInitialState: Bank_Account = {
    account_name: "",
    account_number: "",
    account_sort_code: "",
};

const paypalAccountInitialState: Paypal_Account = {
    email: "",
};

export interface WithdrawScreenProps extends ComponentProps<"div"> {}

const WithdrawScreen: FC<WithdrawScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector(user) as User;
    const currency = useSelector(currencySelector);
    const { loading, errors } = useSelector(addingWithdrawRequest);

    const [usp, setUsp] = useSearchParams();
    const pannel = (usp.get("pannel") || AccountType.BANK_ACCOUNT) as AccountType;

    const [tabIndex, setTabIndex] = useState(0);

    const [amount, setAmount] = useState("");
    const [bank_account, setBank_Account] = useState(bankAccountInitialState);
    const [paypal_account, setPaypal_Account] = useState(paypalAccountInitialState);

    const handleBankAccountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBank_Account((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await dispatch(
            createWithdrawRequest({
                amount: parseFloat(amount),
                to: tabIndex === 0 ? AccountType.BANK_ACCOUNT : AccountType.PAYPAL_ACCOUNT,
                bank_account,
                paypal_account,
            })
        );

        const { status, data } = res.payload as ThunkResponseType<WithdrawRequestsRes, WithdrawRequestErrors>;
        if (status !== RequestLifeCycle.SUCCESS || !data) return;

        dispatch(fireUserUpdated_RT(data.user));

        navigate("/withdraw-requests");
    };

    const selectAllAvailableBalance = () => setAmount(userInfo.availableBalance.toString());

    useEffect(() => {
        switch (pannel) {
            case AccountType.BANK_ACCOUNT:
                setTabIndex(0);
                break;
            case AccountType.PAYPAL_ACCOUNT:
                setTabIndex(1);
                break;
            default:
                setTabIndex(0);
        }
    }, [pannel]);

    if (!userInfo) return null;

    return (
        <PageLayout>
            <div
                {...rest}
                className={classNames("flex flex-col gap-8 sm:gap-16 p-8 sm:p-16 bg-light-dark", {
                    [className]: className,
                })}
            >
                <form className="flex flex-col max-w-2xl mx-auto gap-8 form w-full" onSubmit={handleSubmit}>
                    <Paragraph className="text-2xl sm:text-3xl uppercase tracking-widest font-bold text-accent">
                        Create New Withdraw Request
                    </Paragraph>

                    <Tab.Group as="div" className="w-full" selectedIndex={tabIndex}>
                        <Tab.List className="w-full flex items-center bg-dark-card">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        type="button"
                                        onClick={() => setUsp({ pannel: AccountType.BANK_ACCOUNT })}
                                        className={classNames("w-full py-3 px-6 duration-200", {
                                            "bg-accent text-black font-bold": selected,
                                        })}
                                    >
                                        Bank Account
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        type="button"
                                        onClick={() => setUsp({ pannel: AccountType.PAYPAL_ACCOUNT })}
                                        className={classNames("w-full py-3 px-6 duration-200", {
                                            "bg-accent text-black font-bold": selected,
                                        })}
                                    >
                                        Paypal Account
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className="py-8">
                            <Tab.Panel className="flex flex-col space-y-4">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="account_name">Account Name</label>
                                    <input
                                        id="account_name"
                                        type="text"
                                        required
                                        name="account_name"
                                        placeholder="Account Name"
                                        className="p-3 text-black"
                                        value={bank_account.account_name}
                                        onChange={handleBankAccountChange}
                                    />
                                    {errors.bank_account_errors?.account_name && (
                                        <MessageBox>{errors.bank_account_errors.account_name}</MessageBox>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="account_number">Account Number</label>
                                    <input
                                        id="account_number"
                                        type="number"
                                        required
                                        name="account_number"
                                        placeholder="Account Number"
                                        className="p-3 text-black"
                                        value={bank_account.account_number || ""}
                                        onChange={handleBankAccountChange}
                                    />
                                    {errors.bank_account_errors?.account_number && (
                                        <MessageBox>{errors.bank_account_errors.account_number}</MessageBox>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="account_sort_code">Account Sort Code</label>
                                    <input
                                        id="account_sort_code"
                                        type="number"
                                        required
                                        name="account_sort_code"
                                        placeholder="Account Sort Code"
                                        className="p-3 text-black"
                                        value={bank_account.account_sort_code || ""}
                                        onChange={handleBankAccountChange}
                                    />
                                    {errors.bank_account_errors?.account_sort_code && (
                                        <MessageBox>{errors.bank_account_errors.account_sort_code}</MessageBox>
                                    )}
                                </div>
                            </Tab.Panel>
                            <Tab.Panel className="flex flex-col space-y-4">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="paypal_email">Paypal Email</label>
                                    <input
                                        id="paypal_email"
                                        type="email"
                                        required
                                        name="paypal_name"
                                        placeholder="Paypal Email"
                                        className="p-3 text-black"
                                        value={paypal_account.email}
                                        onChange={({ target }) => setPaypal_Account({ email: target.value })}
                                    />
                                    {errors.paypal_account_errors?.email && (
                                        <MessageBox>{errors.paypal_account_errors.email}</MessageBox>
                                    )}
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                    <div className="flex justify-between items-center gap-8 flex-wrap">
                        <div className="flex flex-col gap-2">
                            <Paragraph className="text-sm">Available Amount (GBP)</Paragraph>
                            <Button type="button" onClick={selectAllAvailableBalance}>
                                <Paragraph className="text-accent text-start underline underline-offset-2">
                                    {userInfo.availableBalance}
                                </Paragraph>
                            </Button>
                        </div>
                        {currency !== GBP && (
                            <div className="flex flex-col gap-2">
                                <Paragraph className="text-sm text-accent">Available Amount ({currency})</Paragraph>
                                <Button type="button" onClick={selectAllAvailableBalance}>
                                    <Paragraph className="text-accent text-start sm:text-end underline underline-offset-2">
                                        <CurrencyConvert amount={userInfo.availableBalance} />
                                    </Paragraph>
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="amount">Amount (GBP)</label>
                        <CurrencyInput
                            value={amount}
                            required
                            placeholder="Amount (GBP)"
                            onChange={({ target }) => setAmount(target.value)}
                            className="p-3"
                        />
                        {errors.amount && <MessageBox>{errors.amount}</MessageBox>}
                    </div>

                    {loading && <LoadingBox />}
                    <ErrorWithRedirect errors={errors} loading={loading} />

                    <Button className="py-3 px-6 w-full bg-accent" type="submit">
                        <Paragraph className="font-bold text-black tracking-wider text-lg">Create</Paragraph>
                    </Button>
                </form>
            </div>
        </PageLayout>
    );
};

export default WithdrawScreen;
