import React, { FC, ComponentProps, useState, useEffect, FormEvent, ChangeEvent } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { useDispatch } from "../hooks/useDispatch";

import data, { countrySelectDefaultOption, countrySelectOptions } from "../data";

import { user } from "../store/auth/selectors";
import { updateCartShippingAddress } from "../store/cart/thunks";

import CheckoutSteps from "../components/kits/CheckoutSteps";
import H1 from "../components/elements/H1";
import Button from "../components/elements/Button";
import TextHeader from "../components/elements/TextHeader";
import AppInput from "../components/elements/AppInput";
import { Address } from "../store/auth/types";

export interface ShippingAddressScreenProps extends ComponentProps<"div"> {}

export type Origin = {
    value: string;
    label: string;
};

const initialState: Address = {
    address: "",
    city: "",
    country: countrySelectDefaultOption.label,
    postalCode: "",
    code: countrySelectDefaultOption.value,
};

const ShippingAddressScreen: FC<ShippingAddressScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector(user);

    const [vars, setVars] = useState(initialState);
    const [updated, setUpdated] = useState(false);

    const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
        setVars((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };
    const updateCode = (o: Origin) => setVars((prev) => ({ ...prev, code: o.value, country: o.label }));

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(updateCartShippingAddress(vars));

        navigate("/placeorder");
    };

    useEffect(() => {
        if (!userInfo || updated) return;

        setVars({
            address: userInfo.address || "",
            city: userInfo.city || "",
            country: userInfo.country || "",
            postalCode: userInfo.postalCode || "",
            code: userInfo.code || "",
        });

        setUpdated(true);
    }, [userInfo, updated]);

    return (
        <div
            {...rest}
            className={classNames("bg-light-dark w-full p-8 flex flex-col space-y-8", { [className]: className })}
        >
            <CheckoutSteps step1 step2 />

            <form className="flex flex-col w-full max-w-2xl mx-auto space-y-6 form" onSubmit={handleSubmit}>
                <H1 className="text-5xl">Shipping Address</H1>

                <div className="flex flex-col">
                    <label htmlFor="address">Address</label>
                    <AppInput
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter address"
                        value={vars.address}
                        onChange={handleUpdate}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="city">City</label>
                    <AppInput
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter city"
                        value={vars.city}
                        onChange={handleUpdate}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="postalCode">Postal Code</label>
                    <AppInput
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        placeholder="Enter postal code"
                        value={vars.postalCode}
                        onChange={handleUpdate}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="country">Country</label>
                    <Select
                        className="multi-select"
                        placeholder="Select Country of Origin"
                        value={{ label: vars.country, value: vars.code }}
                        options={countrySelectOptions}
                        onChange={updateCode as any}
                    />
                </div>

                <Button className="p-3 text-black bg-accent" type="submit">
                    <TextHeader className="text-xl">Continue</TextHeader>
                </Button>
            </form>
        </div>
    );
};

export default ShippingAddressScreen;
