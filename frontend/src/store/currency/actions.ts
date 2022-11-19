import { Dispatch } from "@reduxjs/toolkit";

import { currencyUpdated } from "./reducer";
import { Currency } from "./types";

export function updateCurrency(currency: Currency) {
    return function (dispatch: Dispatch) {
        dispatch({ type: currencyUpdated.type, payload: currency });
    };
}
