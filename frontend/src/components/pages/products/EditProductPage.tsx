import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import CreateEditPosterForm from "../../forms/CreateEditPosterForm";
import PageLayout from "../../../layout/PageLayout";

import { updatingProduct } from "../../../store/products/selectors";
import { CreateEditPosterVars, IProduct } from "../../../store/products/types";
import { updatePoster } from "../../../store/products/thunks";

export interface EditProductPageProps extends ComponentProps<"div"> {
    product: IProduct;
}

const EditProductPage: FC<EditProductPageProps> = ({ className = "", product, ...rest }) => {
    const updating = useSelector(updatingProduct);

    const initialState: CreateEditPosterVars = {
        artists: product.artists.map((a) => a.name),
        casts: product.casts.map((a) => a.name),
        directors: product.directors.map((a) => a.name),
        condition: product.condition,
        description: product.description,
        format: product.format,
        forSale: product.forSale,
        image: product.image,
        images: product.images,
        marketValue: product.marketValue,
        name: product.name,
        origin: product.origin,
        price: product.price.toString(),
        salePrice: product.salePrice.toString(),
        visible: product.visible,
        year: product.year,
        rolledFolded: product.rolledFolded,
        productId: product._id,
    };

    return (
        <PageLayout>
            <div
                {...rest}
                className={classNames("bg-light-dark w-full p-8 sm:p-16 space-y-8", { [className]: className })}
            >
                <CreateEditPosterForm
                    thunk={updatePoster}
                    initialState={initialState}
                    operation={updating}
                    formTitle="Update Poster"
                    redirectToPage
                />
            </div>
        </PageLayout>
    );
};

export default memo(EditProductPage);
