import { createSlice } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { WithdrawRequestsInitialState } from "./initial-state";
import { withdrawRequestsSharedOperation } from "./shared-operations";
import { WithdrawRequestsMap } from "./types";

const slice = createSlice({
    name: "withdrawRequests",
    initialState: WithdrawRequestsInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        for (const { thunk, updateKey } of withdrawRequestsSharedOperation) {
            addCase(thunk.pending, (wq) => {
                wq[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (wq, { payload }) => {
                const {
                    data: { requests },
                } = payload;

                wq.paid = requests.paid;
                wq.pending = requests.pending;
                wq.rejected = requests.rejected;
                wq[updateKey].errors = globalMessage;
                wq[updateKey].loading = false;
            });
            addCase(thunk.rejected, (wq, { payload }) => {
                const { errors } = payload as ThunkResponseType<WithdrawRequestsMap, GlobalMessage>;

                if (errors) wq[updateKey].errors = errors;
                wq[updateKey].loading = false;
            });
        }
    },
});

const withdrawRequestsReducer = slice.reducer;

export default withdrawRequestsReducer;
