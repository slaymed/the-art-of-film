import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { fetchingMyProducts, selectMyProduct } from "../store/products/selectors";

import PageLayout from "../layout/PageLayout";
import Paragraph from "../components/elements/Paragraph";
import EditProductPage from "../components/pages/products/EditProductPage";
import LoadingBox from "../components/kits/LoadingBox";

export interface EditPosterScreenProps extends ComponentProps<"div"> {}

const EditPosterScreen: FC<EditPosterScreenProps> = ({ className = "", ...rest }) => {
    const { posterId } = useParams();

    const fetching = useSelector(fetchingMyProducts);
    const product = useSelector(selectMyProduct(posterId));

    if (!product || fetching.loading)
        return (
            <PageLayout>
                <div {...rest} className={classNames("bg-light-dark w-full p-8 sm:p-16", { [className]: className })}>
                    {fetching.loading ? (
                        <LoadingBox />
                    ) : (
                        <Paragraph className="text-xl sm:text-3xl">Product not Found</Paragraph>
                    )}
                </div>
            </PageLayout>
        );

    return <EditProductPage product={product} />;
};

export default EditPosterScreen;
