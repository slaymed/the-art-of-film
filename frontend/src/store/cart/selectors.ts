import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation, RootState } from "../types";
import { ICart } from "./types";

export const cartData = createSelector(
    (state: RootState) => state.cart.data,
    (cartData: ICart | null) => cartData
);

export const cartItems = createSelector(
    (state: RootState) => state.cart.data,
    (cartData: ICart | null) => cartData?.items
);

export const cartShippingAddress = createSelector(
    (state: RootState) => state.cart.data,
    (cartData: ICart | null) => cartData?.shippingAddress
);

export const addingToCart = createSelector(
    (state: RootState) => state.cart.adding,
    (adding: GlobalOperation) => adding
);
export const updatingCart = createSelector(
    (state: RootState) => state.cart.updating,
    (updating: GlobalOperation) => updating
);
export const fetchingCart = createSelector(
    (state: RootState) => state.cart.fetching,
    (fetching: GlobalOperation) => fetching
);
export const clearingCart = createSelector(
    (state: RootState) => state.cart.clearing,
    (clearing: GlobalOperation) => clearing
);
