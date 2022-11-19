import React, { FC, ComponentProps, useEffect } from "react";
import classNames from "classnames";
import TextHeader from "../components/elements/TextHeader";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchingSelectedProduct, selectedProductSelector } from "../store/products/selectors";
import { useDispatch } from "../hooks/useDispatch";
import { fetchProduct } from "../store/products/thunks";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import Paragraph from "../components/elements/Paragraph";
import ProductPage from "../components/pages/products/ProductPage";

export interface PosterScreenProps extends ComponentProps<"div"> {}

const PosterScreen: FC<PosterScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const { posterId } = useParams();

    const poster = useSelector(selectedProductSelector);
    const fetching = useSelector(fetchingSelectedProduct);

    useEffect(() => {
        if (posterId) dispatch(fetchProduct(posterId));
    }, [dispatch]);

    return (
        <div
            {...rest}
            className={classNames("p-8 sm:p-16 flex flex-col space-y-8 bg-light-dark", { [className]: className })}
        >
            <div className="flex items-center justify-between space-x-4">
                <TextHeader className="text-3xl sm:text-5xl text-accent">Poster Screen</TextHeader>
                {poster && (
                    <Link to={`/posters/${poster._id}/edit`}>
                        <Paragraph className="text-accent text-sm sm:text-lg underline underline-offset-2">
                            Edit
                        </Paragraph>
                    </Link>
                )}
            </div>

            {fetching.loading && <LoadingBox />}
            <ErrorWithRedirect {...fetching} />

            {poster && !fetching.loading && <ProductPage product={poster} />}
        </div>
    );
};

export default PosterScreen;
