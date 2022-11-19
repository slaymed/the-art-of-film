import { createSlice } from "@reduxjs/toolkit";

import { GlobalMessage, ThunkResponseType } from "../types";
import { SellersInitialState } from "./initial-state";
import { globalMessage } from "../initial-state";
import { fetchTopSellers } from "./thunks";
import { User } from "../auth/types";

const slice = createSlice({
    name: "sellers",
    initialState: SellersInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        addCase(fetchTopSellers.pending, (sellers) => {
            sellers.fetching.loading = true;
        });
        addCase(fetchTopSellers.fulfilled, (sellers, { payload }) => {
            const { data: topSellers } = payload;

            sellers.topSellers = topSellers;
            sellers.fetching.loading = false;
            sellers.fetching.errors = globalMessage;
        });
        addCase(fetchTopSellers.rejected, (sellers, { payload }) => {
            const { errors } = payload as ThunkResponseType<User[], GlobalMessage>;

            if (errors) sellers.fetching.errors = errors;
            sellers.fetching.loading = false;
        });
    },
});

const sellersReducer = slice.reducer;

export default sellersReducer;
