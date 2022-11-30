import { Dispatch } from "@reduxjs/toolkit";

import { CURRENCY_LS_KEY } from "./constants";
import { currencyUpdated } from "./reducer";
import { Currency } from "./types";

export function updateCurrency(currency: Currency) {
    return function (dispatch: Dispatch) {
        localStorage.setItem(CURRENCY_LS_KEY, currency);
        dispatch({ type: currencyUpdated.type, payload: currency });
    };
}

export function loadCurrentCurrency() {
    return function (dispatch: Dispatch) {
        const currency = localStorage.getItem(CURRENCY_LS_KEY);
        if (currency) dispatch({ type: currencyUpdated.type, payload: currency });
    };
}
