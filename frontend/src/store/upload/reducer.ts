import { createSlice } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { UploadsInitialState } from "./initial-state";
import { uploadFile } from "./thunks";

const slice = createSlice({
    name: "uploads",
    initialState: UploadsInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        addCase(uploadFile.pending, (uploads) => {
            uploads.upload.loading = true;
        });
        addCase(uploadFile.fulfilled, (uploads) => {
            uploads.upload.loading = false;
            uploads.upload.errors = globalMessage;
        });
        addCase(uploadFile.rejected, (uploads, { payload }) => {
            const { errors } = payload as ThunkResponseType<GlobalMessage, GlobalMessage>;

            if (errors) uploads.upload.errors = errors;
            uploads.upload.loading = false;
        });
    },
});

const uploadsReducer = slice.reducer;

export default uploadsReducer;
