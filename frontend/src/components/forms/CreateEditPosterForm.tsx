import React, { FC, ComponentProps, useEffect, useState, useCallback, ChangeEvent, FormEvent, useRef } from "react";
import classNames from "classnames";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { MultiValue } from "react-select";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { CreateEditPosterVars, IProduct } from "../../store/products/types";
import { fetchPostersTags } from "../../store/tags/thunks";
import { ITag } from "../../store/tags/types";
import { uploadFile } from "../../store/upload/thunks";
import { GlobalMessage, GlobalOperation, ThunkResponseType } from "../../store/types";
import { UploadResponse } from "../../store/upload/types";
import { uploadOperation } from "../../store/upload/selectors";
import { artistesSelector, castsSelector, directorsSelector } from "../../store/tags/selectors";
import { RequestLifeCycle } from "../../store/enums";

import data, { yearOptions } from "../../data";

import { useDispatch } from "../../hooks/useDispatch";

import ErrorWithRedirect from "../kits/ErrorWithRedirect";
import LoadingBox from "../kits/LoadingBox";
import AppInput from "../elements/AppInput";
import TextHeader from "../elements/TextHeader";
import Paragraph from "../elements/Paragraph";
import AppSwitch from "../elements/AppSwitch";
import CurrencyInput from "../elements/CurrencyInput";
import Button from "../elements/Button";
import H1 from "../elements/H1";
import ImagePreviewCard from "../cards/ImagePreviewCard";

const animate = makeAnimated();

export interface CreateEditPosterFormProps extends ComponentProps<"form"> {
    initialState: CreateEditPosterVars;
    operation: GlobalOperation;
    thunk: any;
    formTitle: string;
    resetVars?: boolean;
    redirectToPage?: boolean;
}

export type TagOption = { label: string; value: ITag };

const CreateEditPosterForm: FC<CreateEditPosterFormProps> = ({
    className = "",
    initialState,
    operation,
    thunk,
    formTitle,
    resetVars,
    redirectToPage = false,
    ...rest
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const upload = useSelector(uploadOperation);
    const casts = useSelector(castsSelector);
    const artistes = useSelector(artistesSelector);
    const directors = useSelector(directorsSelector);

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

    const uploadMultipleFiles = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            if (!imagesInputRef.current) return;
            if (!event.target.files || event.target.files.length === 0) return;

            setMultipleUploadInProgress(true);
            for (const file of event.target.files) {
                const res = await dispatch(uploadFile(file));

                const { data: image } = res.payload as ThunkResponseType<UploadResponse, GlobalMessage>;

                if (image) setVars((prev) => ({ ...prev, images: [...prev.images, image.secure_url] }));
            }
            setMultipleUploadInProgress(false);
            imagesInputRef.current.value = "";
        },
        [dispatch]
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVars((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleTagsChange = async (multiValue: MultiValue<TagOption>, ref: string) => {
        setVars((prev) => ({ ...prev, [ref]: multiValue.map(({ label }) => label) }));
    };

    const removeAdditionalImage = (index: number) => {
        const clone = [...vars.images];
        clone.splice(index, 1);
        setVars((prev) => ({ ...prev, images: clone }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await dispatch(thunk(vars));
        const { status } = res.payload as ThunkResponseType<IProduct, GlobalMessage>;
        if (status !== RequestLifeCycle.SUCCESS) return;

        if (resetVars) setVars(initialState);
        navigate("/posters/seller");
    };

    useEffect(() => {
        dispatch(fetchPostersTags());
    }, [dispatch]);

    return (
        <form
            {...rest}
            className={classNames("flex flex-col max-w-2xl mx-auto space-y-6 form w-full")}
            onSubmit={handleSubmit}
        >
            <div className="flex justify-between items-center space-y-4">
                <H1 className="text-3xl sm:text-5xl text-accent">{formTitle}</H1>
                {redirectToPage && (
                    <Link to={`/poster/${initialState.productId}`}>
                        <Paragraph className="text-sm sm:text-lg text-accent underline underline-offset-2">
                            Poster Page
                        </Paragraph>
                    </Link>
                )}
            </div>

            <div className="flex flex-col">
                <label htmlFor="title">Title</label>
                <AppInput
                    type="text"
                    id="title"
                    name="name"
                    placeholder="Enter Title"
                    value={vars.name}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col space-y-6 form">
                {upload.loading && !multipleUploadInProgress && <LoadingBox />}
                <div className="flex flex-col space-y-1">
                    <label htmlFor="poster_image">Upload Poster Image</label>
                    <div className="relative">
                        <input
                            ref={imageInputRef}
                            id="poster_image"
                            type="file"
                            placeholder="Upload Poster Image"
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
                                {vars.image ? "File Uploaded" : "Upload Poster Image"}
                            </TextHeader>
                        </div>
                    </div>
                </div>

                {vars.image && (
                    <ImagePreviewCard
                        image={vars.image}
                        className="max-w-[160px]"
                        imageClasses="max-h-[120px]"
                        onDelete={() => setVars((prev) => ({ ...prev, image: "" }))}
                    />
                )}
            </div>

            <div className="flex flex-col space-y-6 form">
                {multipleUploadInProgress && <LoadingBox />}
                <div className="flex flex-col space-y-1">
                    <label htmlFor="poster_images">Upload Additional Poster Images</label>
                    <div className="relative">
                        <input
                            ref={imagesInputRef}
                            id="poster_images"
                            placeholder="Upload Additional Poster Images"
                            type="file"
                            multiple
                            className="absolute inset-0 opacity-0"
                            onChange={uploadMultipleFiles}
                        />
                        <div
                            className={classNames(
                                "flex cursor-pointer items-center py-3 px-6 border-2 space-x-4 border-dashed",
                                {
                                    "border-accent text-accent": vars.images.length > 0 && !multipleUploadInProgress,
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
                                    : "Upload Additional Poster Images"}
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
                                className="max-w-[150px]"
                                imageClasses="max-h-[120px]"
                                onDelete={() => removeAdditionalImage(index)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div>
                <label htmlFor="directors">Director</label>

                <CreatableSelect
                    defaultValue={vars.directors.map((value) => ({ label: value, value }))}
                    isClearable
                    placeholder="Select Director"
                    className="text-black"
                    options={directors.map((d) => ({ value: d.name, label: d.name }))}
                    onChange={(data: any) => handleTagsChange(data, "directors")}
                    components={animate}
                    isMulti
                />
            </div>
            <div>
                <label htmlFor="directors">Casts</label>

                <CreatableSelect
                    defaultValue={vars.casts.map((value) => ({ label: value, value }))}
                    isClearable
                    placeholder="Select Casts"
                    className="text-black"
                    options={casts.map((d) => ({ value: d.name, label: d.name }))}
                    onChange={(data: any) => handleTagsChange(data, "casts")}
                    components={animate}
                    isMulti
                />
            </div>
            <div>
                <label htmlFor="directors">Artistes</label>

                <CreatableSelect
                    defaultValue={vars.artists.map((value) => ({ label: value, value }))}
                    isClearable
                    placeholder="Select Artistes"
                    className="text-black"
                    options={artistes.map((d) => ({ value: d.name, label: d.name }))}
                    onChange={(data: any) => handleTagsChange(data, "artistes")}
                    components={animate}
                    isMulti
                />
            </div>

            <div>
                <label htmlFor="origin">Country of Origin</label>
                <Select
                    className="multi-select"
                    placeholder="Select Country of Origin"
                    defaultValue={{ label: vars.origin || "United Kingdom" }}
                    options={data.origins.map((country) => ({ value: country.code, label: country.name }))}
                    onChange={(__origin) =>
                        setVars((prev) => ({ ...prev, origin: __origin?.label || "United Kingdom" }))
                    }
                />
            </div>

            <div>
                <label htmlFor="year">Year</label>
                <Select
                    className="multi-select"
                    placeholder="Select Year"
                    defaultValue={{ label: vars.year, value: vars.year }}
                    options={yearOptions as any}
                    onChange={(__year) => setVars((prev) => ({ ...prev, year: +__year?.value! }))}
                />
            </div>

            <div>
                <label htmlFor="format">Format</label>
                <Select
                    className="multi-select"
                    placeholder="Select Format"
                    defaultValue={{ label: vars.format, value: vars.format }}
                    options={data.formats as any}
                    onChange={(__format) => setVars((prev) => ({ ...prev, format: __format?.value || "" }))}
                />
            </div>

            <div>
                <label htmlFor="condition">Condition</label>
                <Select
                    className="multi-select"
                    placeholder="Select Condition"
                    defaultValue={{ label: vars.condition, value: vars.condition }}
                    options={data.conditions}
                    onChange={(__condition) => setVars((prev) => ({ ...prev, condition: __condition?.value || "" }))}
                />
            </div>

            <div>
                <label htmlFor="rolledFolded">Rolled / Folded</label>
                <Select
                    className="multi-select"
                    placeholder="Select Rolled/Folded"
                    defaultValue={{ label: vars.rolledFolded, value: vars.rolledFolded }}
                    options={data.rolledFolded as any}
                    onChange={(__rolledFolded) =>
                        setVars((prev) => ({ ...prev, rolledFolded: __rolledFolded?.value as any }))
                    }
                />
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

            <div className="flex flex-col">
                <label htmlFor="market_value">PRODUCT MARKET VALUE</label>
                <AppInput
                    type="text"
                    id="market_value"
                    name="marketValue"
                    placeholder="Enter Market Value"
                    value={vars.marketValue}
                    onChange={handleChange}
                />
            </div>

            <div className="flex space-x-4 justify-between items-center">
                <Paragraph className="text-accent text-xl">Make Poster Private</Paragraph>
                <AppSwitch
                    enabled={!vars.visible}
                    setEnabled={() => setVars((prev) => ({ ...prev, visible: !prev.visible }))}
                />
            </div>

            <div className="flex space-x-4 justify-between items-center">
                <Paragraph className="text-accent text-xl">For Sale?</Paragraph>
                <AppSwitch
                    enabled={vars.forSale}
                    setEnabled={() => setVars((prev) => ({ ...prev, forSale: !prev.forSale }))}
                />
            </div>

            {vars.forSale && (
                <>
                    <div className="flex flex-col">
                        <label htmlFor="price">Price (GBP)</label>
                        <CurrencyInput
                            id="price"
                            name="price"
                            placeholder="Enter Price (GBP)"
                            value={vars.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="sale_price">Sale Price (GBP)</label>
                        <CurrencyInput
                            id="sale_price"
                            name="salePrice"
                            placeholder="Enter Sale Price (GBP)"
                            value={vars.salePrice}
                            onChange={handleChange}
                        />
                    </div>
                </>
            )}

            {operation.loading && <LoadingBox />}
            <ErrorWithRedirect {...operation} />

            <Button className="p-3 text-black bg-accent" type="submit">
                <TextHeader className="text-xl">Submit</TextHeader>
            </Button>
        </form>
    );
};

export default CreateEditPosterForm;
