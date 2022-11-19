import { createSelector } from "@reduxjs/toolkit";
import { IProduct } from "../products/types";

import { GlobalOperation, RootState } from "../types";
import { IShowcase } from "./types";

export const selectedShowcase = createSelector(
    (state: RootState) => state.showcases.selectedShowcase,
    (selectedShowcase: IShowcase | null) => selectedShowcase
);

export const fetchingSellerShowcase = createSelector(
    (state: RootState) => state.showcases.fetchingSelectedShowCase,
    (fetchingSelectedShowCase: GlobalOperation) => fetchingSelectedShowCase
);

export const selectedShowcaseProduct = createSelector(
    (state: RootState) => state.showcases.selectedProduct,
    (selectedProduct: IProduct | null) => selectedProduct
);
