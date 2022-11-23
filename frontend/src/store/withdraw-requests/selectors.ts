import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";
import { WithdrawRequest, WithdrawRequestOperation } from "./types";

export const addingWithdrawRequest = createSelector(
    (state: RootState) => state.withdrawRequests.adding,
    (adding: WithdrawRequestOperation) => adding
);

export const cancelingWithdrawRequest = createSelector(
    (state: RootState) => state.withdrawRequests.canceling,
    (canceling: WithdrawRequestOperation) => canceling
);

export const fetchingWithdrawRequests = createSelector(
    (state: RootState) => state.withdrawRequests.fetching,
    (fetching: WithdrawRequestOperation) => fetching
);

export const paidWithdrawRequests = createSelector(
    (state: RootState) => state.withdrawRequests.paid,
    (paid: WithdrawRequest[]) => paid
);

export const pendingWithdrawRequests = createSelector(
    (state: RootState) => state.withdrawRequests.pending,
    (pending: WithdrawRequest[]) => pending
);

export const rejectedWithdrawRequests = createSelector(
    (state: RootState) => state.withdrawRequests.rejected,
    (rejected: WithdrawRequest[]) => rejected
);
