import { LazyOperationInitialState, OperationInitialState } from "./../initial-state";
import { IAdvertismentState } from "./types";

export const AdvertismentInitialState: IAdvertismentState = {
    fetching: LazyOperationInitialState,
    create: OperationInitialState,
    list: [],
    createdAdvertise: null,
};
