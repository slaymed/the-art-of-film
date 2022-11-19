import { Dispatch } from "@reduxjs/toolkit";
import { sideNavToggled } from "./reducer";

export function toggleSideNav() {
    return function (dispatch: Dispatch) {
        dispatch({ type: sideNavToggled.type });
    };
}
