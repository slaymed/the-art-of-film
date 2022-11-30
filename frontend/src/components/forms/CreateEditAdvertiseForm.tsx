import React, { FC, ComponentProps, useState, ChangeEvent, useCallback, FormEvent, memo, useRef } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { Advertisement, CreateEditAdvertiseVars } from "../../store/advertisements/types";
import { creatingAdvertisement, updatingAdvertisement } from "../../store/advertisements/selectors";
import { uploadOperation } from "../../store/upload/selectors";
import { uploadFile } from "../../store/upload/thunks";
import { GlobalMessage, ThunkResponseType } from "../../store/types";
import { UploadResponse } from "../../store/upload/types";
import { AdvertisementType } from "../../store/advertisements/enums";
import { createAdvertise, updateAdvertise } from "../../store/advertisements/thunk";
import { createAdvertiseSession } from "../../store/stripe/thunks";
import { ISession } from "../../store/stripe/types";
import { RequestLifeCycle } from "../../store/enums";
import { creatingSession } from "../../store/stripe/selectors";

import Button from "../elements/Button";
import TextHeader from "../elements/TextHeader";
import Paragraph from "../elements/Paragraph";
import MessageBox from "../kits/MessageBox";
import LoadingBox from "../kits/LoadingBox";
import ErrorWithRedirect from "../kits/ErrorWithRedirect";
import CurrencyConvert from "../kits/CurrencyConvert";
import ImagePreviewCard from "../cards/ImagePreviewCard";

import { useDispatch } from "../../hooks/useDispatch";

export interface CreateEditAdvertiseFormProps extends ComponentProps<"form"> {
    initialState: CreateEditAdvertiseVars;
    operation?: "create" | "edit";
    price_for_day: number;
}

const CreateEditAdvertiseForm: FC<CreateEditAdvertiseFormProps> = ({
    className = "",
    initialState,
    operation = "create",
    price_for_day,
    ...rest
}) => {
    const dispatch = useDispatch();

    const { loading, errors } = useSelector(operation === "create" ? creatingAdvertisement : updatingAdvertisement);
    const sessionOperation = useSelector(creatingSession);
    const upload = useSelector(uploadOperation);

    const [vars, setVars] = useState(initialState);
    const [multipleUploadInProgress, setMultipleUploadInProgress] = useState(false);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const imagesInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            if (!imageInputRef.current) return;
            if (!event.target.files || event.target.files.length === 0) return;

            const file = event.target.files[0];

            const res = await dispatch(uploadFile(file));

            const { data: image } = res.payload as ThunkResponseType<UploadResponse, GlobalMessage>;

            if (image) setVars((prev) => ({ ...prev, image: image.secure_url }));
            imageInputRef.current.value = "";
        },
        [dispatch]
    );

    const uploadMultipleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!imagesInputRef.current || !vars.images) return;
        if (!event.target.files || event.target.files.length === 0) return;

        let files = Array.from(event.target.files);
        imagesInputRef.current.value = "";
        if (files.length + vars.images.length > 3) files = files.slice(0, 3 - vars.images.length);

        setMultipleUploadInProgress(true);
        for (const file of files) {
            const res = await dispatch(uploadFile(file));

            const { data: image } = res.payload as ThunkResponseType<UploadResponse, GlobalMessage>;

            if (image) setVars((prev) => ({ ...prev, images: [...(prev.images || []), image.secure_url] }));
        }
        setMultipleUploadInProgress(false);
    };

    const removeAdditionalImage = (index: number) => {
        if (!vars.images) return;
        const clone = [...vars.images];
        clone.splice(index, 1);
        setVars((prev) => ({ ...prev, images: clone }));
    };

    const updateParagraph = (value: string, index: number) => {
        if (!vars.paragraphs) return;
        const clone = [...vars.paragraphs];
        clone[index] = value;
        setVars((prev) => ({ ...prev, paragraphs: clone }));
    };

    const removeAdditionalParagraph = (index: number) => {
        if (!vars.paragraphs) return;
        const clone = [...vars.paragraphs];
        clone.splice(index, 1);
        setVars((prev) => ({ ...prev, paragraphs: clone }));
    };

    const addAdditionalParagraph = () => {
        if (!vars.paragraphs || vars.paragraphs.length === 8) return;
        setVars({ ...vars, paragraphs: [...vars.paragraphs, ""] });
    };

    const handleVarsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVars((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const create = async () => {
        const res = await dispatch(createAdvertise(vars));
        const { status, data: advertise } = res.payload as ThunkResponseType<Advertisement, GlobalMessage>;
        if (status !== RequestLifeCycle.SUCCESS || !advertise) return;

        const sessionRes = await dispatch(createAdvertiseSession(advertise._id));
        const { data: session } = sessionRes.payload as ThunkResponseType<ISession, GlobalMessage>;
        if (!session) return;

        window.open(session.url, "_blank");

        setVars(initialState);
    };

    const update = async () => {
        const res = await dispatch(updateAdvertise(vars));
        const { data: advertise } = res.payload as ThunkResponseType<Advertisement, GlobalMessage>;
        if (!advertise) return;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (operation === "create") create();
        if (operation === "edit") update();
    };

    const calculateAmount = (): number => {
        if (!vars.period_days || !vars.period_days.trim()) return 0;
        const days = parseInt(vars.period_days);
        return days >= 365 ? (days - 60) * price_for_day : price_for_day * days;
    };

    return (
        <form
            {...rest}
            className={classNames("flex flex-col max-w-4xl mx-auto gap-8 form w-full", { [className]: className })}
            onSubmit={handleSubmit}
        >
            {operation === "edit" && (
                <div className="flex flex-col gap-1">
                    <label htmlFor="private_key">Private Key</label>
                    <input
                        id="private_key"
                        type="text"
                        required
                        name="private_key"
                        placeholder="Private Key"
                        className="p-3 text-black"
                        value={vars.private_key}
                        onChange={handleVarsChange}
                    />
                </div>
            )}

            {operation === "create" && (
                <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-4 justify-between">
                        <label htmlFor="period_days">
                            <Paragraph className="text-accent">Advertisement Period (days) </Paragraph>
                        </label>
                        <Paragraph className="text-accent text-sm">
                            <CurrencyConvert amount={price_for_day} /> for day
                        </Paragraph>
                    </div>
                    <input
                        id="period_days"
                        type="number"
                        required
                        name="period_days"
                        placeholder="Advertisement Period (days)"
                        className="p-3 text-black"
                        value={vars.period_days}
                        onChange={handleVarsChange}
                    />
                    <div className="flex gap-4 items-center flex-wrap">
                        {vars.type !== AdvertisementType.ADVERTORIAL && (
                            <Button type="button" onClick={() => setVars((prev) => ({ ...prev, period_days: "30" }))}>
                                <Paragraph className="text-accent text-xs text-start underline underline-offset-2">
                                    1 Month
                                </Paragraph>
                            </Button>
                        )}
                        <Button type="button" onClick={() => setVars((prev) => ({ ...prev, period_days: "60" }))}>
                            <Paragraph className="text-accent text-xs text-start underline underline-offset-2">
                                2 Month
                            </Paragraph>
                        </Button>
                        <Button type="button" onClick={() => setVars((prev) => ({ ...prev, period_days: "90" }))}>
                            <Paragraph className="text-accent text-xs text-start underline underline-offset-2">
                                3 Month
                            </Paragraph>
                        </Button>
                        <Button type="button" onClick={() => setVars((prev) => ({ ...prev, period_days: "180" }))}>
                            <Paragraph className="text-accent text-xs text-start underline underline-offset-2">
                                6 Month
                            </Paragraph>
                        </Button>
                        <Button type="button" onClick={() => setVars((prev) => ({ ...prev, period_days: "270" }))}>
                            <Paragraph className="text-accent text-xs text-start underline underline-offset-2">
                                9 Month
                            </Paragraph>
                        </Button>
                        <Button type="button" onClick={() => setVars((prev) => ({ ...prev, period_days: "365" }))}>
                            <Paragraph className="text-accent text-xs text-start underline underline-offset-2">
                                1 Year
                            </Paragraph>
                        </Button>
                        <Button type="button" onClick={() => setVars((prev) => ({ ...prev, period_days: "730" }))}>
                            <Paragraph className="text-accent text-xs text-start underline underline-offset-2">
                                2 Year
                            </Paragraph>
                        </Button>
                    </div>

                    <Paragraph className="text-accent text-lg font-bold tracking-widest">
                        <CurrencyConvert amount={calculateAmount()} />{" "}
                        {parseInt(vars.period_days!) >= 365 && "- 2 Month Free"}
                    </Paragraph>
                    {errors.period_days && <MessageBox>{errors.period_days}</MessageBox>}
                </div>
            )}

            <div className="flex flex-col gap-1">
                <label htmlFor="title">Advertisement Title</label>
                <input
                    id="title"
                    type="text"
                    required
                    name="title"
                    placeholder="Advertisement Title"
                    className="p-3 text-black"
                    value={vars.title}
                    onChange={handleVarsChange}
                />
                {errors.title && <MessageBox>{errors.title}</MessageBox>}
            </div>

            {vars.type === AdvertisementType.ADVERTORIAL && vars.paragraphs && (
                <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-4 justify-between">
                        <label>Advertisement Paragraphs</label>
                        {vars.paragraphs.length < 8 && (
                            <Button type="button" className="mt-1" onClick={addAdditionalParagraph}>
                                <Paragraph className="text-accent text-sm text-start underline underline-offset-2">
                                    Add Paragraph
                                </Paragraph>
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-col gap-8">
                        {vars.paragraphs.map((paragraph, index) => (
                            <div className="flex items-center gap-8" key={index}>
                                <textarea
                                    required
                                    className="p-3 resize-none text-black w-full text-sm"
                                    value={paragraph}
                                    placeholder="Advertisement Paragraph"
                                    rows={2}
                                    onChange={({ target }) => updateParagraph(target.value, index)}
                                />
                                {index > 0 && (
                                    <Button
                                        type="button"
                                        className="bg-accent w-16 h-16 flex flex-shrink-0 items-center justify-center rounded-full"
                                        onClick={() => removeAdditionalParagraph(index)}
                                    >
                                        <i className="text-black text-2xl fa-solid fa-trash" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-1">
                <label htmlFor="link">Advertisement Link</label>
                <input
                    id="link"
                    type="text"
                    required
                    name="link"
                    placeholder="Advertisement Link"
                    className="p-3 text-black"
                    value={vars.link}
                    onChange={handleVarsChange}
                />
                {errors.link && <MessageBox>{errors.link}</MessageBox>}
            </div>

            <div className="flex flex-col space-y-6 form">
                {upload.loading && !multipleUploadInProgress && <LoadingBox />}
                <div className="flex flex-col space-y-1">
                    <label htmlFor="advertise_image">Upload Advertisement Image</label>
                    <div className="relative">
                        <input
                            ref={imageInputRef}
                            id="advertise_image"
                            type="file"
                            placeholder="Upload Advertisement Image"
                            className="absolute inset-0 opacity-0"
                            onChange={handleUpload}
                        />
                        <div
                            className={classNames(
                                "flex cursor-pointer items-center py-3 px-6 border-2 space-x-4 border-dashed",
                                { "border-accent text-accent": vars.image, "border-white": !vars.image }
                            )}
                        >
                            <span>
                                <i
                                    className={classNames("fas text-xl", {
                                        "fa-upload": !vars.image,
                                        "fa-solid fa-check": vars.image,
                                    })}
                                />
                            </span>
                            <TextHeader className="text-xl" style={{ marginTop: 3 }}>
                                {vars.image ? "File Uploaded" : "Upload Advertisement Image"}
                            </TextHeader>
                        </div>
                    </div>
                </div>
                {errors.image && <MessageBox>{errors.image}</MessageBox>}
                {vars.image && (
                    <ImagePreviewCard
                        image={vars.image}
                        className="max-w-[160px]"
                        imageClasses="max-h-[120px]"
                        onDelete={() => setVars((prev) => ({ ...prev, image: "" }))}
                    />
                )}
            </div>

            {vars.type === AdvertisementType.ADVERTORIAL && vars.images && (
                <div className="flex flex-col space-y-6 form">
                    {multipleUploadInProgress && <LoadingBox />}
                    <div className="flex flex-col space-y-1">
                        <div className="flex flex-wrap gap-4 items-center justify-between">
                            <label htmlFor="poster_images">Upload Additional Advertisement Images</label>
                            <Paragraph className="text-accent text-sm">Max (3)</Paragraph>
                        </div>
                        <div className="relative">
                            <input
                                ref={imagesInputRef}
                                id="poster_images"
                                placeholder="Upload Additional Advertisement Images"
                                type="file"
                                multiple
                                className="absolute inset-0 opacity-0"
                                onChange={uploadMultipleFiles}
                            />
                            <div
                                className={classNames(
                                    "flex cursor-pointer items-center py-3 px-6 border-2 space-x-4 border-dashed",
                                    {
                                        "border-accent text-accent":
                                            vars.images.length > 0 && !multipleUploadInProgress,
                                        "border-white": vars.images.length === 0,
                                    }
                                )}
                            >
                                <span>
                                    <i
                                        className={classNames("fas text-xl", {
                                            "fa-upload": vars.images.length === 0,
                                            "fa-solid fa-check": vars.images.length > 0 && !multipleUploadInProgress,
                                        })}
                                    />
                                </span>
                                <TextHeader className="text-xl" style={{ marginTop: 3 }}>
                                    {vars.images.length > 0 && !multipleUploadInProgress
                                        ? "Files Uploaded"
                                        : "Upload Additional Advertisement Images"}
                                </TextHeader>
                            </div>
                        </div>
                    </div>

                    {vars.images.length > 0 && (
                        <div className="flex flex-wrap gap-6">
                            {vars.images.map((image, index) => (
                                <ImagePreviewCard
                                    image={image}
                                    key={image}
                                    className="max-w-[282px]"
                                    imageClasses="max-h-[120px]"
                                    onDelete={() => removeAdditionalImage(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {loading && <LoadingBox />}
            {sessionOperation.loading && operation === "create" && <LoadingBox />}
            <ErrorWithRedirect errors={errors} loading={loading} />

            <Button
                className="py-3 px-6 w-full bg-accent"
                type="submit"
                disabled={loading || sessionOperation.loading || upload.loading}
            >
                <Paragraph className="font-bold capitalize text-black tracking-wider text-lg">
                    {operation} Advertisement
                </Paragraph>
            </Button>
        </form>
    );
};

export default memo(CreateEditAdvertiseForm);
