import { createSelector } from "@reduxjs/toolkit";
import { GlobalOperation, RootState } from "../types";
import { CurrentSub, ISubscription } from "./types";

export const fetchingAvailableSubscriptions = createSelector(
    (state: RootState) => state.subscriptions.fetchingAvailable,
    (fetchingAvailable: GlobalOperation) => fetchingAvailable
);

export const availableSubscriptions = createSelector(
    (state: RootState) => state.subscriptions.available,
    (available: ISubscription[]) => available
);

export const selectSubScriptionById = (id?: string) =>
    createSelector(
        (state: RootState) => state.subscriptions.available.find((sub) => sub._id === id),
        (sub: ISubscription | undefined) => sub
    );

export const currentSubscription = createSelector(
    (state: RootState) => state.subscriptions.current,
    (current: CurrentSub | null) => current
);

export const fetchingCurrentSub = createSelector(
    (state: RootState) => state.subscriptions.fetchingCurrentSub,
    (fetchingCurrentSub: GlobalOperation) => fetchingCurrentSub
);

export const subscribing = createSelector(
    (state: RootState) => state.subscriptions.subscribe,
    (subscribing: GlobalOperation) => subscribing
);

export const redeemOperation = createSelector(
    (state: RootState) => state.subscriptions.redeem,
    (redeem: GlobalOperation) => redeem
);
