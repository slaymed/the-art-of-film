import { Dispatch } from "@reduxjs/toolkit";

import { IProduct } from "../products/types";
import { productSelected } from "./reducer";

export function selectShowcaseProduct(product: IProduct | null) {
    return function (dispatch: Dispatch) {
        dispatch({ type: productSelected.type, payload: product });
    };
}
