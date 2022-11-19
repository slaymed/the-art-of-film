import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation, RootState } from "../types";
import { User } from "../auth/types";

export const topSellersSelector = createSelector(
    (state: RootState) => state.sellers.topSellers,
    (topSellers: User[]) => topSellers
);

export const fetchingTopSellers = createSelector(
    (state: RootState) => state.sellers.fetching,
    (fetchingTopSellers: GlobalOperation) => fetchingTopSellers
);
