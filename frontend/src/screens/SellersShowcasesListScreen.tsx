import React, { FC, ComponentProps, useEffect } from "react";
import classNames from "classnames";

import HeroSection from "../components/sections/HeroSection";
import { useDispatch } from "../hooks/useDispatch";
import { fetchSellersShowcaseList } from "../store/showcase/thunks";
import { useSelector } from "react-redux";
import { fetchingSellersShowcaseList, sellersShowcaseList } from "../store/showcase/selectors";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import SellerShowcaseCard from "../components/cards/SellerShowcaseCard";

export interface SellersShowcasesListScreenProps extends ComponentProps<"div"> {}

const SellersShowcasesListScreen: FC<SellersShowcasesListScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const fetching = useSelector(fetchingSellersShowcaseList);
    const showcases = useSelector(sellersShowcaseList);

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

            {fetching.loading && <LoadingBox className="mx-auto p-8 sm:p-16" />}
            <ErrorWithRedirect {...fetching} className="mx-auto p-8 sm:p-16" />

            {!fetching.loading && Array.isArray(showcases) && (
                <div className="flex flex-wrap gap-8 sm:gap-16 p-8 sm:p-16">
                    {showcases.map(({ seller }) => (
                        <SellerShowcaseCard key={seller._id} seller={seller} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SellersShowcasesListScreen;
