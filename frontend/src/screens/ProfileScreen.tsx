import React, { FC, ComponentProps, useState, useCallback, ChangeEvent, FormEvent, useEffect } from "react";
import classNames from "classnames";
import Select from "react-select";
import { useSelector } from "react-redux";

import PageLayout from "../layout/PageLayout";
import H1 from "../components/elements/H1";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import AppInput from "../components/elements/AppInput";
import TextHeader from "../components/elements/TextHeader";
import Button from "../components/elements/Button";

import { GlobalMessage, ThunkResponseType } from "../store/types";
import { uploadFile } from "../store/upload/thunks";
import { UploadResponse } from "../store/upload/types";
import { uploadOperation } from "../store/upload/selectors";
import { UpdateUserVars } from "../store/auth/types";
import { updatingProfile, user } from "../store/auth/selectors";
import { updateProfile } from "../store/auth/thunks";

import { useDispatch } from "../hooks/useDispatch";

import { countrySelectDefaultOption, countrySelectOptions } from "../data";

export interface ProfileScreenProps extends ComponentProps<"div"> {}

const intialState: UpdateUserVars = {
    email: "",
    logo: "",
    name: "",
    password: "",
    description: "",
    confirm_pasword: "",
    sellerName: "",
    address: "",
    city: "",
    country: countrySelectDefaultOption.label,
    code: countrySelectDefaultOption.value,
    postalCode: "",
};

const ProfileScreen: FC<ProfileScreenProps> = ({ className = "", ...rest }) => {
    const [vars, setVars] = useState(intialState);

    const dispatch = useDispatch();

    const updating = useSelector(updatingProfile);
    const upload = useSelector(uploadOperation);
    const userInfo = useSelector(user);

    const handleUpload = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files || event.target.files.length === 0) return;

            const file = event.target.files[0];

            const res = await dispatch(uploadFile(file));

            const { data: image } = res.payload as ThunkResponseType<UploadResponse, GlobalMessage>;

            if (image) setVars((prev) => ({ ...prev, logo: image.secure_url }));
        },
        [dispatch]
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVars((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const updateCountry = (event: any) => {
        setVars((prev) => ({ ...prev, country: event?.label, code: event?.value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (vars.password !== vars.confirm_pasword) return alert("Password Must Match");

        dispatch(updateProfile(vars));
    };

    useEffect(() => {
        if (!userInfo) return;

        setVars((prev) => ({ ...prev, ...userInfo }));
    }, [userInfo]);

    return (
        <PageLayout>
            <div {...rest} className={classNames("bg-light-dark w-full p-8 sm:p-16", { [className]: className })}>
                <form className="flex flex-col max-w-2xl mx-auto space-y-6 form w-full" onSubmit={handleSubmit}>
                    <H1 className="text-5xl text-accent">My Profile</H1>

                    <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <AppInput
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Name"
                            value={vars.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email">Email address</label>
                        <AppInput
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={vars.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <AppInput
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            value={vars.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="confirm_pasword">Confirm Password</label>
                        <AppInput
                            type="password"
                            id="confirm_pasword"
                            name="confirm_pasword"
                            placeholder="Confirm Password"
                            value={vars.confirm_pasword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="collection_name">Collection Name</label>
                        <AppInput
                            type="text"
                            id="collection_name"
                            name="sellerName"
                            placeholder="Collection Name"
                            value={vars.sellerName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col space-y-6 form">
                        {upload.loading && <LoadingBox />}
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="logo">Logo</label>
                            <div className="relative">
                                <AppInput
                                    id="logo"
                                    name="logo"
                                    type="file"
                                    className="absolute inset-0 opacity-0"
                                    onChange={handleUpload}
                                />
                                <div
                                    className={classNames(
                                        "flex cursor-pointer items-center py-3 px-6 border-2 space-x-4 border-dashed",
                                        { "border-accent text-accent": vars.logo, "border-white": !vars.logo }
                                    )}
                                >
                                    <span>
                                        <i
                                            className={classNames("fas text-xl", {
                                                "fa-upload": !vars.logo,
                                                "fa-solid fa-check": vars.logo,
                                            })}
                                        />
                                    </span>
                                    <TextHeader className="text-xl" style={{ marginTop: 3 }}>
                                        {vars.logo ? "File Uploaded" : "Click or drag file here to upload."}
                                    </TextHeader>
                                </div>
                            </div>
                        </div>
                        {vars.logo && (
                            <div className="w-full max-w-[120px]">
                                <img src={vars.logo} className="w-full max-h-[120px] object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description">Description</label>
                        <AppInput
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Enter Description"
                            value={vars.description}
                            onChange={handleChange}
                        />
                    </div>

                    <TextHeader className="text-2xl text-accent pt-4">Address Settings</TextHeader>

                    <div className="flex flex-col">
                        <label htmlFor="address">Address</label>
                        <AppInput
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter Address"
                            value={vars.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="city">City</label>
                        <AppInput
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Enter City"
                            value={vars.city}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="country">Country</label>
                        <Select
                            className="multi-select"
                            placeholder="Select Country of Origin"
                            value={{ label: vars.country, value: vars.code }}
                            options={countrySelectOptions}
                            onChange={updateCountry}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="postal_code">Zip Code</label>
                        <AppInput
                            type="text"
                            id="postal_code"
                            name="postalCode"
                            placeholder="Enter Zip Code"
                            value={vars.postalCode}
                            onChange={handleChange}
                        />
                    </div>

                    {updating.loading && <LoadingBox />}
                    <ErrorWithRedirect {...updating} />

                    <Button className="p-3 text-black bg-accent" type="submit">
                        <TextHeader className="text-xl">Update</TextHeader>
                    </Button>
                </form>
            </div>
        </PageLayout>
    );
};

export default ProfileScreen;
