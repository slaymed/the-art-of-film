import { LazyOperationInitialState } from "../initial-state";
import { GBP } from "./constants";
import { ICurrencyState, Rates } from "./types";

export const RatesInitialState: Rates = {
    GBP: 1,
    USD: 1.22255,
    EUR: 1.164851,
    JPY: 164.0,
};

export const CurrencyInitialState: ICurrencyState = {
    currency: GBP,
    fetchingRates: LazyOperationInitialState,
    rates: RatesInitialState,
    symbol: "£",
};
