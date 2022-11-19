import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation, RootState } from "../types";
import { Advertisment } from "./types";

export const fetchingAdvertisments = createSelector(
    (state: RootState) => state.advertisments.fetching,
    (fetching: GlobalOperation) => fetching
);

export const advertismentsSelector = createSelector(
    (state: RootState) => state.advertisments.list,
    (advertisments: Advertisment[]) => advertisments
);
