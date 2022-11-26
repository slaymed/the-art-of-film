import { Dispatch } from "@reduxjs/toolkit";
import { createAdvertisementErrorsRemoved } from "./reducer";

export function resetCreateAdvertiseErrors() {
    return function (dispatch: Dispatch) {
        dispatch({ type: createAdvertisementErrorsRemoved.type });
    };
}
