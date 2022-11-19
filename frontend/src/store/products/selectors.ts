import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation, RootState } from "../types";
import { IProduct } from "./types";

export const productsSelector = createSelector(
    (state: RootState) => state.products.list,
    (products: IProduct[]) => products
);

export const selectMyProduct = (productId?: string) =>
    createSelector(
        (state: RootState) => state.products.myProducts.find((p) => p._id === productId),
        (product?: IProduct) => product
    );

export const fetchingProducts = createSelector(
    (state: RootState) => state.products.fetching,
    (fetching: GlobalOperation) => fetching
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
