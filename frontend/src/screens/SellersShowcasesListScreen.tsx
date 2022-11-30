import React, { FC, ComponentProps, useEffect, useState, useMemo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { useDispatch } from "../hooks/useDispatch";

import { fetchSellersShowcaseList } from "../store/showcase/thunks";
import { fetchingSellersShowcaseList, sellersShowcaseList } from "../store/showcase/selectors";

import HeroSection from "../components/sections/HeroSection";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import SellerShowcaseCard from "../components/cards/SellerShowcaseCard";
import CombinedAdsSection from "../components/sections/ads/CombinedAdsSection";
import AlphbetNumericFilter from "../components/kits/AlphbetNumericFilter";

export interface SellersShowcasesListScreenProps extends ComponentProps<"div"> {}

const SellersShowcasesListScreen: FC<SellersShowcasesListScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const fetching = useSelector(fetchingSellersShowcaseList);
    const showcases = useSelector(sellersShowcaseList);

    const [filter, setFilter] = useState("All");

    const filteredList = useMemo(() => {
        if (!filter || filter === "All") return showcases;
        if (filter === "0..9") return showcases.filter(({ seller }) => /\d/.test(seller.name));
        return showcases.filter(({ seller }) => seller.name.toLowerCase().startsWith(filter.toLowerCase()));
    }, [filter, showcases]);

    useEffect(() => {
        dispatch(fetchSellersShowcaseList());
    }, [dispatch]);

    return (
        <div
            {...rest}
            className={classNames("flex flex-col bg-light-dark", {
                [className]: className,
            })}
        >
            <HeroSection heading="SHOWCASE GALLERIES" heading2="Home/Showcase" image="/images/Henry-Bedroom-2-1.jpg" />

            <div className="pt-8 sm:pt-12 px-8 sm:px-12">
                <div className="bg-dark-card rounded-lg mx-auto p-8 flex justify-center items-center">
                    <AlphbetNumericFilter filter={filter} updateFilter={setFilter} />
                </div>
            </div>

            {fetching.loading && <LoadingBox className="mx-auto p-8 sm:p-12" />}
            <ErrorWithRedirect {...fetching} className="mx-auto p-8 sm:p-12" />

            {!fetching.loading && (
                <div className="flex flex-col gap-8 sm:gap-12 p-8 sm:p-12">
                    <div className="w-full flex">
                        <div className="w-full">
                            {Array.isArray(filteredList) && (
                                <div className="flex flex-wrap justify-center xl:justify-start gap-8 sm:gap-12">
                                    {filteredList.map(({ seller }) => (
                                        <SellerShowcaseCard key={seller._id} seller={seller} />
                                    ))}
                                </div>
                            )}
                        </div>
                        {
                            <div className="hidden sticky top-0 xl:block w-fit">
                                <CombinedAdsSection
                                    flex="column"
                                    className="bg-dark-card rounded-lg"
                                    sizeClasses="w-[290px] h-[290px]"
                                />
                            </div>
                        }
                    </div>
                    <CombinedAdsSection
                        flex="row"
                        className="xl:hidden bg-dark-card rounded-lg"
                        sizeClasses="w-[290px] h-[290px]"
                    />
                </div>
            )}
        </div>
    );
};

export default SellersShowcasesListScreen;
