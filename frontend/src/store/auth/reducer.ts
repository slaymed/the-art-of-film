import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { ThunkResponseType } from "../types";
import { AuthIntialState } from "./initial-state";
import { authSharedOperation, resetPasswordSharedOperation } from "./shared-operations";
import { RegisterErrors, User } from "./types";

const slice = createSlice({
    name: "auth",
    initialState: AuthIntialState,
    reducers: {
        userUpdated_RT(auth, { payload: user }: PayloadAction<User>) {
            if (auth.user?._id !== user._id) return;
            if (auth.user) auth.user = user;
        },
    },
    extraReducers({ addCase }) {
        // Add All Shared Operations
        for (const { thunk, updateKey } of authSharedOperation) {
            addCase(thunk.pending, (auth) => {
                auth[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (auth, { payload }) => {
                const { data: user } = payload;

                auth.user = user;
                auth[updateKey].loading = false;
                auth[updateKey].errors = globalMessage;
            });
            addCase(thunk.rejected, (auth, { payload }) => {
                const { errors } = payload as ThunkResponseType<User, RegisterErrors>;

                if (errors) auth[updateKey].errors = errors;
                auth[updateKey].loading = false;
            });
        }

        // Reset Password Operations
        for (const { thunk, updateKey } of resetPasswordSharedOperation) {
            addCase(thunk.pending, (auth) => {
                auth[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (auth, { payload }) => {
                auth[updateKey].loading = false;
                auth[updateKey].errors = globalMessage;
                if (payload.data.message) alert(payload.data.message);
            });
            addCase(thunk.rejected, (auth, { payload }) => {
                const { errors } = payload as ThunkResponseType<User, RegisterErrors>;

                if (errors) auth[updateKey].errors = errors;
                auth[updateKey].loading = false;
            });
        }
    },
});

const authReducer = slice.reducer;

export const { userUpdated_RT } = slice.actions;

export default authReducer;
