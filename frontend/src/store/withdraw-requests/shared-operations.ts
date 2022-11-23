import { CANCELING_WITHDRAW_REQUEST, CREATING_WITHDRAW_REQUEST, FETCHING_WITHDRAW_REQUESTS } from "./constants";
import { cancelWithdrawRequest, createWithdrawRequest, fetchWithdrawRequests } from "./thunks";

export const withdrawRequestsSharedOperation = [
    {
        thunk: fetchWithdrawRequests,
        updateKey: FETCHING_WITHDRAW_REQUESTS,
    },
    {
        thunk: createWithdrawRequest,
        updateKey: CREATING_WITHDRAW_REQUEST,
    },
    {
        thunk: cancelWithdrawRequest,
        updateKey: CANCELING_WITHDRAW_REQUEST,
    },
];
