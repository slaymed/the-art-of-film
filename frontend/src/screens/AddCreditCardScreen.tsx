import React, { FC, ComponentProps, FormEvent, useState, useRef, useCallback, ChangeEvent, useEffect } from "react";
import classNames from "classnames";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { countrySelectOptions } from "../data";

import { useDispatch } from "../hooks/useDispatch";

import Paragraph from "../components/elements/Paragraph";
import AppSwitch from "../components/elements/AppSwitch";
import Button from "../components/elements/Button";
import MessageBox from "../components/kits/MessageBox";
import LoadingBox from "../components/kits/LoadingBox";
import Page from "../components/pages/Page";

import { CreditCardErrors, ICreditCard, PaymentMethodAddress } from "../store/payment-methods/types";
import { addingCreditCard } from "../store/payment-methods/selectors";
import { addCreditCard } from "../store/payment-methods/thunks";
import { ThunkResponseType } from "../store/types";
import { RequestLifeCycle } from "../store/enums";
import { user } from "../store/auth/selectors";

const addressInitialState: PaymentMethodAddress = {
    city: "",
    country: "GB",
    line1: "",
    line2: "",
    postal_code: "",
    state: "",
};

export interface AddCreditCardScreenProps extends ComponentProps<"div"> {}

const AddCreditCardScreen: FC<AddCreditCardScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, errors } = useSelector(addingCreditCard);
    const userInfo = useSelector(user);

    const [sp] = useSearchParams();

    const [cardNumber, setCardNumber] = useState({ first4: "", second4: "", third4: "", forth4: "" });
    const [cardDate, setCardDate] = useState({ exp_month: "", exp_year: "" });
    const [cardName, setCardName] = useState("");
    const [phone, setPhone] = useState("");
    const [cvc, setCvc] = useState("");
    const [address, setAddress] = useState(addressInitialState);
    const [useAccountName, setUseAccountName] = useState(false);
    const [useAccountAddress, setUseAccountAddress] = useState(true);

    const first4InputRef = useRef<HTMLInputElement>(null);
    const second4InputRef = useRef<HTMLInputElement>(null);
    const third4InputRef = useRef<HTMLInputElement>(null);
    const forth4InputRef = useRef<HTMLInputElement>(null);
    const cvcInputRef = useRef<HTMLInputElement>(null);
    const expMonthInputRef = useRef<HTMLInputElement>(null);
    const expYearInputRef = useRef<HTMLInputElement>(null);
    const cardNameInputRef = useRef<HTMLInputElement>(null);

    const handleCardNumberChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        if (value.length <= 4) setCardNumber((prev) => ({ ...prev, [name]: value }));

        if (name === "first4" && value.length > 3) second4InputRef.current?.focus();
        if (name === "second4" && value.length > 3) third4InputRef.current?.focus();
        if (name === "third4" && value.length > 3) forth4InputRef.current?.focus();
        if (name === "forth4" && value.length > 3) cvcInputRef.current?.focus();
    }, []);

    const handleCvcChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value.length <= 3) setCvc(value);
        if (value.length > 2) expMonthInputRef.current?.focus();
    }, []);

    const handleExpDateChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "exp_month") {
            if (value.length <= 2) setCardDate((prev) => ({ ...prev, [name]: value }));
            if (value.length > 1) expYearInputRef.current?.focus();
        }

        if (name === "exp_year") {
            if (value.length <= 4) setCardDate((prev) => ({ ...prev, [name]: value }));
            if (value.length > 3) cardNameInputRef.current?.focus();
        }
    }, []);

    const handleAddressChange = (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        setAddress((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const toggleUseAccountName = () => setUseAccountName((prev) => !prev);

    useEffect(() => {
        if (!userInfo) return;

        if (useAccountName) setCardName(userInfo.name);
        if (!useAccountName) setCardName("");
    }, [useAccountName, userInfo]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const number = parseInt(`${cardNumber.first4}${cardNumber.second4}${cardNumber.third4}${cardNumber.forth4}`);

        const creditCard = {
            cvc,
            exp_month: parseInt(cardDate.exp_month),
            exp_year: parseInt(cardDate.exp_year),
            useMyAccountName: useAccountName,
            useMyAccountAddress: useAccountAddress,
            address: useAccountAddress ? undefined : address,
            name: cardName,
            number,
            phone,
        };

        const res = await dispatch(addCreditCard(creditCard));
        const { status } = res.payload as ThunkResponseType<ICreditCard[], CreditCardErrors>;
        if (status !== RequestLifeCycle.SUCCESS) return;

        navigate(sp.get("redirect") || "/payment-methods/credit-cards");
    };

    return (
        <Page {...rest} className={classNames("", { [className]: className })}>
            <form className="form flex flex-col space-y-6 max-w-2xl mx-auto w-full" onSubmit={handleSubmit}>
                <Paragraph className="text-xl uppercase sm:text-3xl text-accent tracking-wider font-bold">
                    Add New Credit Card
                </Paragraph>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="number">
                        <Paragraph className="text-sm text-slate-500/80 uppercase">Card Number</Paragraph>
                    </label>
                    <div className="flex items-center space-x-6">
                        <input
                            ref={first4InputRef}
                            name="first4"
                            type="number"
                            placeholder="1234"
                            className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                            required
                            value={cardNumber.first4}
                            onChange={handleCardNumberChange}
                        />
                        <input
                            ref={second4InputRef}
                            name="second4"
                            type="number"
                            placeholder="1234"
                            className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                            required
                            value={cardNumber.second4}
                            onChange={handleCardNumberChange}
                        />
                        <input
                            ref={third4InputRef}
                            name="third4"
                            type="number"
                            placeholder="1234"
                            className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                            required
                            value={cardNumber.third4}
                            onChange={handleCardNumberChange}
                        />
                        <input
                            ref={forth4InputRef}
                            name="forth4"
                            type="number"
                            placeholder="1234"
                            className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                            required
                            value={cardNumber.forth4}
                            onChange={handleCardNumberChange}
                        />
                    </div>
                    {errors.number && <MessageBox className="text-sm">{errors.number}</MessageBox>}
                </div>

                <div className="flex items-center space-x-6">
                    <div className="flex flex-col w-full space-y-1">
                        <label htmlFor="cvc">
                            <Paragraph className="text-sm text-slate-500/80 uppercase">CVC</Paragraph>
                        </label>
                        <input
                            ref={cvcInputRef}
                            type="text"
                            id="cvc"
                            name="cvc"
                            placeholder="CVC"
                            className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                            required
                            value={cvc}
                            onChange={handleCvcChange}
                        />
                        {errors.cvc && <MessageBox className="text-sm">{errors.cvc}</MessageBox>}
                    </div>
                    <div className="flex flex-col w-full space-y-1">
                        <label htmlFor="exp_month">
                            <Paragraph className="text-sm text-slate-500/80 uppercase">Exp Month</Paragraph>
                        </label>
                        <input
                            ref={expMonthInputRef}
                            type="number"
                            id="exp_month"
                            name="exp_month"
                            placeholder="Exp Month"
                            className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                            required
                            value={cardDate.exp_month}
                            onChange={handleExpDateChange}
                        />
                        {errors.exp_month && <MessageBox className="text-sm">{errors.exp_month}</MessageBox>}
                    </div>
                    <div className="flex flex-col w-full space-y-1">
                        <label htmlFor="exp_year">
                            <Paragraph className="text-sm text-slate-500/80 uppercase">Exp Year</Paragraph>
                        </label>
                        <input
                            ref={expYearInputRef}
                            type="number"
                            id="exp_year"
                            name="exp_year"
                            placeholder="Exp Year"
                            className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                            required
                            value={cardDate.exp_year}
                            onChange={handleExpDateChange}
                        />
                        {errors.exp_year && <MessageBox className="text-sm">{errors.exp_year}</MessageBox>}
                    </div>
                </div>

                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="card_name">
                        <Paragraph className="text-sm text-slate-500/80 uppercase">Full Name</Paragraph>
                    </label>
                    <input
                        ref={cardNameInputRef}
                        type="text"
                        id="card_name"
                        name="exp_month"
                        placeholder="Full Name"
                        className={classNames("w-full bg-slate-700 rounded py-1.5 px-3 text-white", {
                            "bg-slate-800": useAccountName,
                        })}
                        disabled={useAccountName}
                        required
                        value={cardName}
                        onChange={({ target }) => setCardName(target.value)}
                    />
                    <Paragraph
                        onClick={toggleUseAccountName}
                        className="underline select-none cursor-pointer text-accent underline-offset-2 text-sm"
                    >
                        {useAccountName ? "Use Custom Name" : "Use My Account name"}
                    </Paragraph>
                    {errors.name && <MessageBox className="text-sm">{errors.name}</MessageBox>}
                </div>

                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="phone">
                        <Paragraph className="text-sm text-slate-500/80 uppercase">Phone Number</Paragraph>
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                        required
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                    {errors.phone && <MessageBox className="text-sm">{errors.phone}</MessageBox>}
                </div>

                <div className="flex space-x-4 items-center justify-between py-2">
                    <Paragraph className="text-xl uppercase sm:text-3xl text-accent tracking-wider font-bold">
                        Use Default Account Address
                    </Paragraph>
                    <AppSwitch enabled={useAccountAddress} setEnabled={setUseAccountAddress} />
                </div>

                {!useAccountAddress && (
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="country">
                                <Paragraph className="text-sm text-slate-500/80 uppercase">Country</Paragraph>
                            </label>
                            <select
                                name="country"
                                id="country"
                                className="bg-slate-700 rounded text-sm px-2 py-1.5 text-white/80"
                                defaultValue={address.country}
                                required
                                onChange={handleAddressChange}
                            >
                                {countrySelectOptions.map(({ label, value }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.address?.country && (
                                <MessageBox className="text-sm">{errors.address.country}</MessageBox>
                            )}
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="line1">
                                <Paragraph className="text-sm text-slate-500/80 uppercase">line 1</Paragraph>
                            </label>
                            <input
                                type="text"
                                id="line1"
                                name="line1"
                                placeholder="line 1"
                                className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                                required
                                value={address.line1}
                                onChange={handleAddressChange}
                            />
                            {errors.address?.line1 && (
                                <MessageBox className="text-sm">{errors.address.line1}</MessageBox>
                            )}
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="line2">
                                <Paragraph className="text-sm text-slate-500/80 uppercase">line 2</Paragraph>
                            </label>
                            <input
                                type="text"
                                id="line2"
                                name="line2"
                                placeholder="line 2"
                                className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                                value={address.line2}
                                onChange={handleAddressChange}
                            />
                            {errors.address?.line2 && (
                                <MessageBox className="text-sm">{errors.address.line2}</MessageBox>
                            )}
                        </div>

                        <div className="flex space-x-6 items-center">
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="city">
                                    <Paragraph className="text-sm text-slate-500/80 uppercase">City</Paragraph>
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                                    required
                                    value={address.city}
                                    onChange={handleAddressChange}
                                />
                                {errors.address?.city && (
                                    <MessageBox className="text-sm">{errors.address.city}</MessageBox>
                                )}
                            </div>
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="postal_code">
                                    <Paragraph className="text-sm text-slate-500/80 uppercase">Postal Code</Paragraph>
                                </label>
                                <input
                                    type="text"
                                    id="postal_code"
                                    name="postal_code"
                                    placeholder="Postal Code"
                                    className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                                    required
                                    value={address.postal_code}
                                    onChange={handleAddressChange}
                                />
                                {errors.address?.postal_code && (
                                    <MessageBox className="text-sm">{errors.address.postal_code}</MessageBox>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="state">
                                <Paragraph className="text-sm text-slate-500/80 uppercase">State</Paragraph>
                            </label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="State"
                                className="w-full bg-slate-700 rounded py-1.5 px-3 text-white"
                                required
                                value={address.state}
                                onChange={handleAddressChange}
                            />
                            {errors.address?.state && (
                                <MessageBox className="text-sm">{errors.address.state}</MessageBox>
                            )}
                        </div>
                    </div>
                )}

                {errors.message && <MessageBox className="text-center">{errors.message}</MessageBox>}
                {loading && <LoadingBox />}

                <Button
                    type="submit"
                    className="bg-accent/20 text-accent hover:text-black hover:bg-accent duration-200 rounded py-3.5 px-4"
                >
                    <Paragraph className="font-bold">Add Credit Card</Paragraph>
                </Button>
            </form>
        </Page>
    );
};

export default AddCreditCardScreen;
