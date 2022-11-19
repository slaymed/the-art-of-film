import { Dispatch } from "@reduxjs/toolkit";

import { stripePropUpdated } from "./reducer";
import { IStripeState } from "./types";

export function updateStripeProp(payload: Partial<IStripeState>) {
    return function (dispatch: Dispatch) {
        dispatch({ type: stripePropUpdated.type, payload });
    };
}
