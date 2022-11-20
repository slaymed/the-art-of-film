import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { IProduct } from "../products/types";
import { GlobalMessage, ThunkResponseType } from "../types";
import { ShowcaseInitialState } from "./initial-state";
import { fetchingSellersShowcaseListSharedOperations } from "./shared-operations";
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

        for (const { thunk, updateKey, targetedValue } of fetchingSellersShowcaseListSharedOperations) {
            addCase(thunk.pending, (showcases) => {
                showcases[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (showcases, { payload }) => {
                const { data: list } = payload;

                showcases[targetedValue] = list;
                showcases[updateKey].loading = false;
                showcases[updateKey].errors = globalMessage;
            });
            addCase(thunk.rejected, (showcases, { payload }) => {
                const { errors } = payload as ThunkResponseType<Pick<IShowcase, "seller">, GlobalMessage>;

                if (errors) showcases[updateKey].errors = errors;
                showcases[updateKey].loading = false;
            });
        }
    },
});

const showcasesReducer = slice.reducer;

export const { productSelected } = slice.actions;

export default showcasesReducer;
