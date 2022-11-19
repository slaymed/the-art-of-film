import { createSlice } from "@reduxjs/toolkit";
import { indexFound } from "../../helpers/index-found";

import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { ProductsInitialState } from "./initial-state";
import { create_edit_product_shared_operation, fetchingProductsSharedOperations } from "./shared-operations";
import { createPoster, deletePoster, fetchProduct, fetchProducts } from "./thunks";
import { IProduct } from "./types";

const slice = createSlice({
    name: "products",
    initialState: ProductsInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        for (const { thunk, targetedValue, updateKey } of fetchingProductsSharedOperations) {
            addCase(thunk.pending, (products) => {
                products[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (products, { payload }) => {
                const { data: list } = payload;

                products[targetedValue] = list;
                products[updateKey].loading = false;
                products[updateKey].errors = globalMessage;
            });
            addCase(thunk.rejected, (products, { payload }) => {
                const { errors } = payload as ThunkResponseType<IProduct[], GlobalMessage>;

                if (errors) products[updateKey].errors = errors;
                products[updateKey].loading = false;
            });
        }

        for (const { thunk, updateKey } of create_edit_product_shared_operation) {
            addCase(thunk.pending, (products) => {
                products[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (products, { payload }) => {
                const { data: poster } = payload;

                const posterIndex = products.myProducts.findIndex((p) => p._id === poster._id);

                if (indexFound(posterIndex)) products.myProducts[posterIndex] = poster;
                if (!indexFound(posterIndex)) products.myProducts.unshift(poster);

                products[updateKey].loading = false;
                products[updateKey].errors = globalMessage;
            });
            addCase(thunk.rejected, (products, { payload }) => {
                const { errors } = payload as ThunkResponseType<IProduct[], GlobalMessage>;

                if (errors) products[updateKey].errors = errors;
                products[updateKey].loading = false;
            });
        }

        addCase(deletePoster.pending, (products) => {
            products.remove.loading = true;
        });
        addCase(deletePoster.fulfilled, (products, { payload }) => {
            const { data: poster } = payload;

            const posterIndex = products.myProducts.findIndex((p) => p._id === poster._id);

            if (indexFound(posterIndex)) products.myProducts.splice(posterIndex, 1);

            products.remove.loading = false;
            products.remove.errors = globalMessage;
        });
        addCase(deletePoster.rejected, (products, { payload }) => {
            const { errors } = payload as ThunkResponseType<IProduct[], GlobalMessage>;

            if (errors) products.remove.errors = errors;
            products.remove.loading = false;
        });

        addCase(fetchProduct.pending, (products) => {
            products.fetchingSelectedProduct.loading = true;
        });
        addCase(fetchProduct.fulfilled, (products, { payload }) => {
            const { data: poster } = payload;

            products.selectedProduct = poster;
            products.fetchingSelectedProduct.loading = false;
            products.fetchingSelectedProduct.errors = globalMessage;
        });
        addCase(fetchProduct.rejected, (products, { payload }) => {
            const { errors } = payload as ThunkResponseType<IProduct[], GlobalMessage>;

            if (errors) products.fetchingSelectedProduct.errors = errors;
            products.fetchingSelectedProduct.loading = false;
        });
    },
});

const productsReducer = slice.reducer;

export default productsReducer;
