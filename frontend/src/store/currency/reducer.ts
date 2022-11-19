import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { EUR, JPY, USD } from "./constants";
import { CurrencyInitialState } from "./initial-state";
import { fetchRates } from "./thunks";
import { Currency, Rates } from "./types";

const slice = createSlice({
    name: "currencyState",
    initialState: CurrencyInitialState,
    reducers: {
        currencyUpdated(currencyState, { payload }: PayloadAction<Currency>) {
            currencyState.currency = payload;

            switch (payload) {
                case USD:
                    currencyState.symbol = "$";
                    break;
                case EUR:
                    currencyState.symbol = "€";
                    break;
                case JPY:
                    currencyState.symbol = "¥";
                    break;
                default:
                    currencyState.symbol = "£";
            }
        },
    },
    extraReducers({ addCase }) {
        addCase(fetchRates.pending, (currencyState) => {
            currencyState.fetchingRates.loading = true;
        });
        addCase(fetchRates.fulfilled, (currencyState, { payload }) => {
            const { data: rates } = payload;

            if (!rates["message"]) if (rates) currencyState.rates = rates;
            currencyState.fetchingRates.loading = false;
            currencyState.fetchingRates.errors = rates["message"] ? rates["message"] : globalMessage;
        });
        addCase(fetchRates.rejected, (currencyState, { payload }) => {
            const { errors } = payload as ThunkResponseType<Rates, GlobalMessage>;

            if (errors) currencyState.fetchingRates.errors = errors;
            currencyState.fetchingRates.loading = false;
        });
    },
});

const currencyReducer = slice.reducer;

export const { currencyUpdated } = slice.actions;

export default currencyReducer;
