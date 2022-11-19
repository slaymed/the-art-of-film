import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../types";
import { ISession } from "./types";
import { GlobalOperation } from "./../types";

export const creatingSession = createSelector(
    (state: RootState) => state.stripe.create,
    (create: GlobalOperation) => create
);

export const cancelingSession = createSelector(
    (state: RootState) => state.stripe.cancel,
    (cancel: GlobalOperation) => cancel
);

export const currentSession = createSelector(
    (state: RootState) => state.stripe.currentSession,
    (currentSession: ISession | null) => currentSession
);
