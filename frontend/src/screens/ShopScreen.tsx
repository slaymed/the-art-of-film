import React, { FC, ComponentProps, useState, useEffect, ChangeEvent, useCallback } from "react";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";

import TextHeader from "../components/elements/TextHeader";
import AppSwitch from "../components/elements/AppSwitch";
import Button from "../components/elements/Button";
import Paragraph from "../components/elements/Paragraph";
import ArtistsSelect from "../components/kits/ArtistsSelect";
import DirectorsSelect from "../components/kits/DirectorsSelect";
import CastsSelect from "../components/kits/CastsSelect";
import OriginSelect from "../components/kits/OriginSelect";
import YearSelect from "../components/kits/YearSelect";
import ConditionSelect from "../components/kits/ConditionSelect";
import FormatSelect from "../components/kits/FormatSelect";
import PriceSelect from "../components/kits/PriceSelect";
import CombinedAdsSection from "../components/sections/ads/CombinedAdsSection";
import ShopProductsList from "../components/lists/shop/ShopProductsList";
import ShopTotalCount from "../components/kits/ShopTotalCount";
import ShopPaginator from "../components/kits/ShopPaginator";

import { usp_prev } from "../helpers/get-url-search-stream-previous-values";
import { useDispatch } from "../hooks/useDispatch";

import { fetchPostersTags } from "../store/tags/thunks";
import { fetchShopProducts } from "../store/shop/thunks";

export interface ShopScreenProps extends ComponentProps<"div"> {}

const FILTER = "filter";
const NAME = "name";
const DIRECTOR = "director";
const CAST = "cast";
const ARTIST = "artist";
const ORIGIN = "origin";
const YEAR = "year";
const CONDITION = "condition";
const FORMAT = "format";
const PRICE = "price";

const ShopScreen: FC<ShopScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const [sp, setSp] = useSearchParams();

    const advanceFiltersLength = Object.keys(usp_prev(sp)).filter((key) => key !== "filter" && key !== "name").length;

    const sold = sp.get(FILTER) === "sold";
    const name = sp.get(NAME) || "";
    const director = sp.get(DIRECTOR) || "";
    const cast = sp.get(CAST) || "";
    const artist = sp.get(ARTIST) || "";
    const origin = sp.get(ORIGIN) || "";
    const year = sp.get(YEAR) || "";
    const condition = sp.get(CONDITION) || "";
    const format = sp.get(FORMAT) || "";
    const price = sp.get(PRICE) || "";

    const [value, setValue] = useState(name);
    const [advanceSearch, setAdvanceSearch] = useState(advanceFiltersLength > 0 ? true : false);

    const toggleSold = useCallback(
        (value: boolean) => {
            setSp((prev) => ({ ...usp_prev(prev), [FILTER]: value ? "sold" : "" }));
        },
        [setSp]
    );

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
            if (window["name_timeout"]) clearTimeout(window["name_timeout"]);
            window["name_timeout"] = setTimeout(
                () => setSp((prev) => ({ ...usp_prev(prev), name: event.target.value })),
                1000
            );
        },
        [setSp]
    );

    const handleSelectChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            setSp((prev) => ({ ...usp_prev(prev), [event.target.name]: event.target.value }));
        },
        [setSp]
    );

    const clear = () => {
        setSp({});
        if (value) setValue("");
    };

    useEffect(() => {
        dispatch(fetchPostersTags());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchShopProducts({ itemsPerPage: 6, query: usp_prev(sp), requestedPageNumber: 1 }));
    }, [sp, dispatch]);

    return (
        <div
            {...rest}
            className={classNames("flex flex-col p-8 md:p-16 gap-8 md:gap-16 bg-light-dark", {
                [className]: className,
            })}
        >
            <TextHeader className="text-accent text-6xl">Shop</TextHeader>
            <div className="flex gap-8 md:gap-16 w-full">
                <div className="flex flex-col w-full gap-8 md:gap-16 lg:flex-row">
                    <div className="w-full lg:w-fit flex flex-col gap-4">
                        <div className="flex justify-between items-center gap-4">
                            <span className="text-lg md:text-2xl tracking-widest text-slate-300">
                                Include Sold Posters
                            </span>
                            <AppSwitch enabled={sold} setEnabled={toggleSold} />
                        </div>
                        <div className="flex justify-between items-center">
                            <ShopTotalCount />
                            <Button type="button" className="w-fit" onClick={clear}>
                                <Paragraph className="text-sm text-start underline tracking-wider underline-offset-2 text-accent">
                                    Clear
                                </Paragraph>
                            </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col gap-8 md:gap-16">
                            <form className="form flex flex-col w-full text-slate-400 space-y-4">
                                <input
                                    type="text"
                                    id="name"
                                    name={NAME}
                                    placeholder="Type Poster Name To Search..."
                                    className="w-full bg-slate-700 p-3 text-white"
                                    value={value}
                                    onChange={handleInputChange}
                                />

                                <div className="flex justify-between items-center">
                                    <Paragraph className="text-sm text-start tracking-wider text-accent">
                                        {advanceFiltersLength.toString()} Added Filters
                                    </Paragraph>
                                    <Button type="button" onClick={() => setAdvanceSearch((prev) => !prev)}>
                                        <Paragraph className="text-sm text-start underline tracking-wider underline-offset-2 text-accent">
                                            {advanceSearch ? "Close" : "Advance Search"}
                                        </Paragraph>
                                    </Button>
                                </div>

                                {advanceSearch && (
                                    <>
                                        <div>
                                            <label htmlFor={DIRECTOR} className="tracking-wider text-lg">
                                                Directors
                                            </label>
                                            <DirectorsSelect
                                                id={DIRECTOR}
                                                name={DIRECTOR}
                                                value={director}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={CAST} className="tracking-wider text-lg">
                                                Casts
                                            </label>
                                            <CastsSelect
                                                id={CAST}
                                                name={CAST}
                                                value={cast}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={ARTIST} className="tracking-wider text-lg">
                                                Artists
                                            </label>
                                            <ArtistsSelect
                                                id={ARTIST}
                                                name={ARTIST}
                                                value={artist}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={ORIGIN} className="tracking-wider text-lg">
                                                Origin
                                            </label>
                                            <OriginSelect
                                                id={ORIGIN}
                                                name={ORIGIN}
                                                value={origin}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={YEAR} className="tracking-wider text-lg">
                                                Year
                                            </label>
                                            <YearSelect
                                                id={YEAR}
                                                name={YEAR}
                                                value={year}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={CONDITION} className="tracking-wider text-lg">
                                                Condition
                                            </label>
                                            <ConditionSelect
                                                id={CONDITION}
                                                name={CONDITION}
                                                value={condition}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={FORMAT} className="tracking-wider text-lg">
                                                Format
                                            </label>
                                            <FormatSelect
                                                id={FORMAT}
                                                name={FORMAT}
                                                value={format}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={PRICE} className="tracking-wider text-lg">
                                                Price
                                            </label>
                                            <PriceSelect
                                                id={PRICE}
                                                name={PRICE}
                                                value={price}
                                                onChange={handleSelectChange}
                                            />
                                        </div>
                                    </>
                                )}
                            </form>

                            <CombinedAdsSection
                                flex="column"
                                className="bg-dark-card rounded-lg sm:hidden"
                                showLinks={1}
                                showadverts={0}
                                sizeClasses="w-[200px] xs:w-[300px] h-[200px] xs:h-[300px]"
                            />

                            <CombinedAdsSection flex="column" className="bg-dark-card rounded-lg hidden lg:flex" />
                        </div>
                    </div>
                    <div className="w-full hidden lg:block lg:w-2/3 xl:w-3/4 h-full">
                        <div className="flex flex-col gap-8 md:gap-16">
                            <ShopProductsList listClasses="gap-8 md:gap-16 grid lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3" />
                            <ShopPaginator />
                        </div>
                    </div>
                </div>
                <div className="w-fit hidden sm:block lg:hidden">
                    <CombinedAdsSection
                        flex="column"
                        className="bg-dark-card rounded-lg"
                        sizeClasses="sm:w-[185px] md:w-[240px] h-[185px]"
                        showLinks={advanceSearch ? 3 : 1}
                        showadverts={advanceSearch ? 3 : 0}
                    />
                </div>
            </div>
            <div className="flex flex-col lg:hidden gap-8 md:gap-16">
                <ShopProductsList listClasses="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16" />
                <ShopPaginator />
            </div>
        </div>
    );
};

export default ShopScreen;
