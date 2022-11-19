import { Dispatch } from "@reduxjs/toolkit";

import { userUpdated_RT } from "./reducer";
import { User } from "./types";

export function fireUserUpdated_RT(payload: User) {
    return function (dispatch: Dispatch) {
        dispatch({ type: userUpdated_RT, payload });
    };
}
