import { Dispatch } from "@reduxjs/toolkit";

import { orderRecieved_RT, orderRemoved_RT } from "./reducer";
import { IOrder } from "./types";

export function fireOrderRecieved_RT(payload: IOrder) {
    return function (dispatch: Dispatch) {
        dispatch({ type: orderRecieved_RT.type, payload });
    };
}

export function fireOrderRemoved_RT(payload: string) {
    return function (dispatch: Dispatch) {
        dispatch({ type: orderRemoved_RT.type, payload });
    };
}
