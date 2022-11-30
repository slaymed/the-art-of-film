import { createSlice } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { ShopInitialState } from "./initial-state";
import { fetchShopProducts } from "./thunks";
import { FetchingShopProductsResponse } from "./types";

const slice = createSlice({
    name: "shop",
    initialState: ShopInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        addCase(fetchShopProducts.pending, (shop) => {
            shop.fetchingShopProducts.loading = true;
        });
        addCase(fetchShopProducts.fulfilled, (shop, { payload }) => {
            const { data } = payload;
            if (!data) return;
            const { products, currentPage, pagesCount, totalCount } = data;

            shop.products = products;
            shop.currentPage = currentPage;
            shop.pagesCount = pagesCount;
            shop.totalCount = totalCount;
            shop.fetchingShopProducts.errors = globalMessage;
            shop.fetchingShopProducts.loading = false;
        });
        addCase(fetchShopProducts.rejected, (shop, { payload }) => {
            const { errors } = payload as ThunkResponseType<FetchingShopProductsResponse, GlobalMessage>;

            shop.products = [];
            shop.pagesCount = null;
            shop.totalCount = 0;
            if (errors) shop.fetchingShopProducts.errors = errors;
            shop.fetchingShopProducts.loading = false;
        });
    },
});

const shopReducer = slice.reducer;

export default shopReducer;
