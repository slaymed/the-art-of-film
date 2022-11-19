import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { IProduct } from "../products/types";
import { GlobalMessage, ThunkResponseType } from "../types";
import { ShowcaseInitialState } from "./initial-state";
import { fetchSellerShowcase } from "./thunks";
import { IShowcase } from "./types";

const slice = createSlice({
    name: "showcases",
    initialState: ShowcaseInitialState,
    reducers: {
        productSelected(showcases, { payload }: PayloadAction<IProduct | null>) {
            showcases.selectedProduct = payload;
        },
    },
    extraReducers({ addCase }) {
        addCase(fetchSellerShowcase.pending, (showcases) => {
            showcases.fetchingSelectedShowCase.loading = true;
        });
        addCase(fetchSellerShowcase.fulfilled, (showcases, { payload }) => {
            const { data: Showcase } = payload;

            showcases.selectedShowcase = Showcase;
            showcases.fetchingSelectedShowCase.loading = false;
            showcases.fetchingSelectedShowCase.errors = globalMessage;
        });
        addCase(fetchSellerShowcase.rejected, (showcases, { payload }) => {
            const { errors } = payload as ThunkResponseType<IShowcase, GlobalMessage>;

            if (errors) showcases.fetchingSelectedShowCase.errors = errors;
            showcases.fetchingSelectedShowCase.loading = false;
        });
    },
});

const showcasesReducer = slice.reducer;

export const { productSelected } = slice.actions;

export default showcasesReducer;
