import React, { FC, ComponentProps, useState, FormEvent } from "react";
import classNames from "classnames";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Paragraph from "../components/elements/Paragraph";
import AppInput from "../components/elements/AppInput";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import Button from "../components/elements/Button";
import TextHeader from "../components/elements/TextHeader";
import { syncingAdvertisement } from "../store/advertisements/selectors";

import { syncAdvertise } from "../store/advertisements/thunk";
import { GlobalMessage, ThunkResponseType } from "../store/types";
import { RequestLifeCycle } from "../store/enums";
import { Advertisement } from "../store/advertisements/types";

import { useDispatch } from "../hooks/useDispatch";

export interface FindYourAdvertisementScreenProps extends ComponentProps<"div"> {}

const FindYourAdvertisementScreen: FC<FindYourAdvertisementScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, errors } = useSelector(syncingAdvertisement);

    const [advertismentId, setAdvertismentId] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!advertismentId) return;

        const res = await dispatch(syncAdvertise(advertismentId));
        const { status, data } = res.payload as ThunkResponseType<Advertisement, GlobalMessage>;
        if (status !== RequestLifeCycle.SUCCESS || !data) return;

        setAdvertismentId("");

        navigate(`/advertisement/${data._id}`);
    };

    return (
        <div
            {...rest}
            className={classNames("flex flex-col space-y-8 p-8 sm:p-16 bg-light-dark", { [className]: className })}
        >
            <form className="flex flex-col max-w-2xl mx-auto space-y-6 form w-full" onSubmit={handleSubmit}>
                <Paragraph className="text-2xl sm:text-3xl  uppercase text-accent font-bold tracking-widest">
                    Find your Advertisment
                </Paragraph>

                <div className="flex flex-col">
                    <label htmlFor="advertisement_id">Advertisement Id</label>
                    <AppInput
                        type="text"
                        id="advertisement_id"
                        name="advertismentId"
                        placeholder="Advertisement Id"
                        required
                        value={advertismentId}
                        onChange={({ target }) => setAdvertismentId(target.value)}
                    />
                </div>

                {loading && <LoadingBox className="mx-auto" />}

                <ErrorWithRedirect errors={errors} loading={loading} className="items-center" />

                <Button className="p-3 text-black bg-accent" type="submit" disabled={loading}>
                    <TextHeader className="text-xl">Find your Advertisment</TextHeader>
                </Button>
            </form>
        </div>
    );
};

export default FindYourAdvertisementScreen;
