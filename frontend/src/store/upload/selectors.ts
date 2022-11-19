import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation, RootState } from "../types";

export const uploadOperation = createSelector(
    (state: RootState) => state.uploads.upload,
    (upload: GlobalOperation) => upload
);
