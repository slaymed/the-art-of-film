import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation, RootState } from "../types";
import { IProduct } from "./types";

export const homeProductsSelector = createSelector(
    (state: RootState) => state.products.homelist,
    (homelist: IProduct[]) => homelist
);

export const selectMyProduct = (productId?: string) =>
    createSelector(
        (state: RootState) => state.products.myProducts.find((p) => p._id === productId),
        (product?: IProduct) => product
    );

export const fetchingHomeProducts = createSelector(
    (state: RootState) => state.products.fetchingHomeProducts,
    (fetchingHomeProducts: GlobalOperation) => fetchingHomeProducts
);

export const fetchingMyProducts = createSelector(
    (state: RootState) => state.products.fetchingMyProducts,
    (fetchingMyProducts: GlobalOperation) => fetchingMyProducts
);

export const myProductsSelector = createSelector(
    (state: RootState) => state.products.myProducts,
    (myProducts: IProduct[]) => myProducts
);

export const creatingProduct = createSelector(
    (state: RootState) => state.products.create,
    (create: GlobalOperation) => create
);

export const updatingProduct = createSelector(
    (state: RootState) => state.products.update,
    (update: GlobalOperation) => update
);

export const deletingProduct = createSelector(
    (state: RootState) => state.products.remove,
    (remove: GlobalOperation) => remove
);

export const selectedProductSelector = createSelector(
    (state: RootState) => state.products.selectedProduct,
    (selectedProduct: IProduct | null) => selectedProduct
);

export const fetchingSelectedProduct = createSelector(
    (state: RootState) => state.products.fetchingSelectedProduct,
    (fetchingSelectedProduct: GlobalOperation) => fetchingSelectedProduct
);
