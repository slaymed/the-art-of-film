import { createSlice } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { SubscriptionInitialState } from "./initial-state";
import { ISubscription } from "./types";
import { GlobalMessage, ThunkResponseType } from "../types";
import { subscriptionSharedOperations } from "./shared-operations";
import { fetchAvailableSubscriptions, redeemGiftSub } from "./thunks";

const slice = createSlice({
    name: "subscriptions",
    initialState: SubscriptionInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        for (const { thunk, updateKey } of subscriptionSharedOperations) {
            addCase(thunk.pending, (subscriptions) => {
                subscriptions[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (subscriptions, { payload }) => {
                const { data: currentSub } = payload;

                subscriptions.current = currentSub;
                subscriptions[updateKey].errors = globalMessage;
                subscriptions[updateKey].loading = false;
            });
            addCase(thunk.rejected, (subscriptions, { payload }) => {
                const { errors } = payload as ThunkResponseType<ISubscription[], GlobalMessage>;

                if (errors) subscriptions[updateKey].errors = errors;
                subscriptions[updateKey].loading = false;
            });
        }

        addCase(fetchAvailableSubscriptions.pending, (subscriptions) => {
            subscriptions.fetchingAvailable.loading = true;
        });
        addCase(fetchAvailableSubscriptions.fulfilled, (subscriptions, { payload }) => {
            const { data: availableSubscriptions } = payload;

            subscriptions.available = availableSubscriptions;
            subscriptions.fetchingAvailable.errors = globalMessage;
            subscriptions.fetchingAvailable.loading = false;
        });
        addCase(fetchAvailableSubscriptions.rejected, (subscriptions, { payload }) => {
            const { errors } = payload as ThunkResponseType<ISubscription[], GlobalMessage>;

            if (errors) subscriptions.fetchingAvailable.errors = errors;
            subscriptions.fetchingAvailable.loading = false;
        });

        addCase(redeemGiftSub.pending, (subscriptions) => {
            subscriptions.redeem.loading = true;
        });
        addCase(redeemGiftSub.fulfilled, (subscriptions, { payload }) => {
            const { data: currentSub } = payload;

            subscriptions.current = currentSub;
            subscriptions.redeem.errors = globalMessage;
            subscriptions.fetchingCurrentSub.errors = globalMessage;
            subscriptions.redeem.loading = false;
        });
        addCase(redeemGiftSub.rejected, (subscriptions, { payload }) => {
            const { errors } = payload as ThunkResponseType<ISubscription[], GlobalMessage>;

            if (errors) subscriptions.redeem.errors = errors;
            subscriptions.redeem.loading = false;
        });
    },
});

const subscriptionsReducer = slice.reducer;

export default subscriptionsReducer;
