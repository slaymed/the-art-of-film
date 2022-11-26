import { LazyOperationInitialState, OperationInitialState } from "../initial-state";
import { CREATE_ADVERTISE, SYNC_ADVERTISE, UPDATE_ADVERTISE } from "./constants";
import { IAdvertisementState } from "./types";

export const AdvertisementInitialState: IAdvertisementState = {
    fetching: LazyOperationInitialState,
    [CREATE_ADVERTISE]: OperationInitialState,
    [UPDATE_ADVERTISE]: OperationInitialState,
    [SYNC_ADVERTISE]: OperationInitialState,
    list: [],
};
