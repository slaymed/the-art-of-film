import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation, RootState } from "../types";
import { Currency, Rates } from "./types";

export const currencyFetching = createSelector(
    (state: RootState) => state.currencyState.fetchingRates,
    (fetchingRates: GlobalOperation) => fetchingRates
);

export const currencySelector = createSelector(
    (state: RootState) => state.currencyState.currency,
    (currency: Currency) => currency
);

export const symbolSelector = createSelector(
    (state: RootState) => state.currencyState.symbol,
    (symbol: string) => symbol
);

export const ratesSelector = createSelector(
    (state: RootState) => state.currencyState.rates,
    (rates: Rates) => rates
);
