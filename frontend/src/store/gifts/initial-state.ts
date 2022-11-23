import { LazyOperationInitialState, OperationInitialState } from "../initial-state";
import { BUYING_GIFT, SYNCING_GIFT } from "./constants";
import { IGiftState } from "./types";

export const GiftsInitialState: IGiftState = {
    [BUYING_GIFT]: OperationInitialState,
    [SYNCING_GIFT]: OperationInitialState,
    fetching: LazyOperationInitialState,
    list: [],
};
