import React, { FC, ComponentProps, useState, useCallback, ChangeEvent, FormEvent } from "react";
import classNames from "classnames";
import Select from "react-select";
import { useSelector } from "react-redux";

import PageLayout from "../layout/PageLayout";

import { useDispatch } from "../hooks/useDispatch";

import data from "../data";

import { ISession } from "../store/stripe/types";
import { creatingSession } from "../store/stripe/selectors";
import { uploadOperation } from "../store/upload/selectors";
import { uploadFile } from "../store/upload/thunks";
import { GlobalMessage, ThunkResponseType } from "../store/types";
import { UploadResponse } from "../store/upload/types";
import { createAdvertise } from "../store/advertisments/thunk";
import { AdvertismentType } from "../store/advertisments/enums";
import { Advertisment } from "../store/advertisments/types";
import { createAdvertiseSession } from "../store/stripe/thunks";

import TextHeader from "../components/elements/TextHeader";
import MessageBox from "../components/kits/MessageBox";
import LoadingBox from "../components/kits/LoadingBox";
import Button from "../components/elements/Button";
import AppInput from "../components/elements/AppInput";
import H1 from "../components/elements/H1";

export interface AdvertiseScreenProps extends ComponentProps<"form"> {}

const AdvertiseScreen: FC<AdvertiseScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const create = useSelector(creatingSession);
    const upload = useSelector(uploadOperation);

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState<AdvertismentType>(data.advert_types.sponsor as any);

    const handleUpload = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files || event.target.files.length === 0) return;

            const file = event.target.files[0];

            const res = await dispatch(uploadFile(file));

            const { data: image } = res.payload as ThunkResponseType<UploadResponse, GlobalMessage>;

            if (image) setImage(image.secure_url);
        },
        [dispatch]
    );

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await dispatch(createAdvertise({ image, title, link, type }));
        const { data: advertise } = res.payload as ThunkResponseType<Pick<Advertisment, "_id">, GlobalMessage>;
        if (!advertise) return;

        const sessionRes = await dispatch(createAdvertiseSession(advertise._id));
        const { data: session } = sessionRes.payload as ThunkResponseType<ISession, GlobalMessage>;
        if (!session) return;

        window.open(session.url, "_blank");

        setImage("");
        setTitle("");
        setLink("");
    };

    return (
        <PageLayout>
            <div className="flex items-center justify-center h-screen-top-nav-less p-8">
                <form
                    {...rest}
                    className={classNames("w-full form max-w-xl flex flex-col space-y-6", {
                        [className]: className,
                    })}
                    onSubmit={handleSubmit}
                >
                    <div className="flex items-center justify-center space-x-4 sm:space-x-8">
                        <i className="text-5xl sm:text-6xl fa-solid fa-rectangle-ad" />
                        <H1 className="text-4xl sm:text-6xl">Advertise with us</H1>
                    </div>

                    <div className="flex flex-col space-y-6">
                        {create.loading && <LoadingBox />}
                        {create.errors.message && <MessageBox variant="danger">{create.errors.message}</MessageBox>}
                    </div>

                    {!create.loading && !create.errors.message && (
                        <div className="flex flex-col space-y-6">
                            <Select
                                className="multi-select"
                                placeholder="Choose your advertising option"
                                options={Object.keys(data.advert_types).map((key) => ({
                                    value: key,
                                    label: data.advert_types[key],
                                }))}
                                onChange={(adertise) => setType(adertise?.value || (data.advert_types.sponsor as any))}
                            />

                            <div className="flex flex-col">
                                <label htmlFor="title">Company Name</label>
                                <AppInput
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter Company Name"
                                    value={title}
                                    onChange={({ target }) => setTitle(target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="link">Link</label>
                                <AppInput
                                    id="link"
                                    name="link"
                                    type="text"
                                    placeholder="Link to follow"
                                    value={link}
                                    onChange={({ target }) => setLink(target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-6 form">
                                {upload.loading && <LoadingBox />}
                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="advertisment-image">Advertisement Card</label>
                                    <div className="relative">
                                        <AppInput
                                            id="advertisment-image"
                                            name="advertisment-image"
                                            type="file"
                                            className="absolute inset-0 opacity-0"
                                            onChange={handleUpload}
                                        />
                                        <div
                                            className={classNames(
                                                "flex cursor-pointer items-center py-3 px-6 border-2 space-x-4 border-dashed",
                                                { "border-accent text-accent": image, "border-white": !image }
                                            )}
                                        >
                                            <span>
                                                <i
                                                    className={classNames("fas text-xl", {
                                                        "fa-upload": !image,
                                                        "fa-solid fa-check": image,
                                                    })}
                                                />
                                            </span>
                                            <TextHeader className="text-xl" style={{ marginTop: 3 }}>
                                                {image ? "File Uploaded" : "Click or drag file here to upload."}
                                            </TextHeader>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button className="px-12 py-3 text-black bg-accent" type="submit">
                                <TextHeader className="text-md">Advertise</TextHeader>
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </PageLayout>
    );
};

export default AdvertiseScreen;
