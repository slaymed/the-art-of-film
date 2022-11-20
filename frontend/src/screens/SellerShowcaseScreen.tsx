import React, { FC, ComponentProps, useEffect } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { fetchingSellerShowcase, selectedShowcase } from "../store/showcase/selectors";
import { fetchSellerShowcase } from "../store/showcase/thunks";

import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import SellerShowcasePage from "../components/pages/showcase/SellerShowcasePage";

import { useDispatch } from "../hooks/useDispatch";

export interface SellerShowcaseScreenProps extends ComponentProps<"div"> {}

const SellerShowcaseScreen: FC<SellerShowcaseScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();
    const { sellerId } = useParams();

    const showcase = useSelector(selectedShowcase);
    const fetching = useSelector(fetchingSellerShowcase);

    useEffect(() => {
        if (sellerId) dispatch(fetchSellerShowcase(sellerId));
    }, [sellerId, dispatch]);

    return (
        <div
            {...rest}
            className={classNames("flex pt-8 sm:pt-16 gap-8 sm:gap-16 bg-light-dark justify-center", {
                [className]: className,
            })}
        >
            {fetching.loading && <LoadingBox className="pb-8 sm:pb-16" />}
            <ErrorWithRedirect {...fetching} className="pb-8 sm:pb-16" />
            {!fetching.loading && showcase && !fetching.errors.message && <SellerShowcasePage showcase={showcase} />}
        </div>
    );
};

export default SellerShowcaseScreen;
