import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { StripeInitialState } from "./initial-state";
import { stripeSharedOperation } from "./shared-operation";
import { ISession, IStripeState } from "./types";

const slice = createSlice({
    name: "stripe",
    initialState: StripeInitialState,
    reducers: {
        stripePropUpdated(stripe, { payload }: PayloadAction<Partial<IStripeState>>) {
            Object.assign(stripe, payload);
        },
    },
    extraReducers({ addCase }) {
        for (const { thunk, updateKey } of stripeSharedOperation) {
            addCase(thunk.pending, (stripe) => {
                stripe[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (stripe, { payload }) => {
                const { data: session } = payload;

                stripe.currentSession = session;
                stripe[updateKey].loading = false;
                stripe[updateKey].errors = globalMessage;
            });
            addCase(thunk.rejected, (stripe, { payload }) => {
                const { errors } = payload as ThunkResponseType<ISession, GlobalMessage>;

                if (errors) stripe[updateKey].errors = errors;
                stripe[updateKey].loading = false;
            });
        }
    },
});

const stripeReducer = slice.reducer;

export const { stripePropUpdated } = slice.actions;

export default stripeReducer;
