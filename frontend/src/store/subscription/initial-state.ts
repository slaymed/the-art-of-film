import { LazyOperationInitialState, OperationInitialState } from "../initial-state";
import { FETCH_CURRENT_SUB, SUBSCRIBE } from "./constants";
import { ISubscriptionState } from "./types";

export const SubscriptionInitialState: ISubscriptionState = {
    available: [],
    fetchingAvailable: LazyOperationInitialState,
    current: null,
    [FETCH_CURRENT_SUB]: LazyOperationInitialState,
    [SUBSCRIBE]: OperationInitialState,
    redeem: OperationInitialState,
};
