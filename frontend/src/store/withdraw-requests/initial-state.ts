import { LazyOperationInitialState, OperationInitialState } from "../initial-state";
import { CANCELING_WITHDRAW_REQUEST, CREATING_WITHDRAW_REQUEST, FETCHING_WITHDRAW_REQUESTS } from "./constants";
import { IWithdrawRequestsState, WithdrawRequestErrors, WithdrawRequestOperation } from "./types";

export const withdrawRequestErrorsInitialState: WithdrawRequestErrors = {
    message: "",
};

export const lazyWithdrawRequestOperationInitialState: WithdrawRequestOperation = {
    loading: true,
    errors: withdrawRequestErrorsInitialState,
};

export const withdrawRequestOperationInitialState: WithdrawRequestOperation = {
    loading: false,
    errors: withdrawRequestErrorsInitialState,
};

export const WithdrawRequestsInitialState: IWithdrawRequestsState = {
    [FETCHING_WITHDRAW_REQUESTS]: lazyWithdrawRequestOperationInitialState,
    [CREATING_WITHDRAW_REQUEST]: withdrawRequestOperationInitialState,
    [CANCELING_WITHDRAW_REQUEST]: withdrawRequestOperationInitialState,
    pending: [],
    paid: [],
    rejected: [],
};
