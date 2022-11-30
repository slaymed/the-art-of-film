import { LazyOperationInitialState, OperationInitialState } from "../initial-state";
import { ADDING_TO_CART, CLEARING_CART, FETCHING_CART, REMOVING_FROM_CART, UPDATING_CART } from "./constants";
import { ICartState } from "./types";

export const CartInitialState: ICartState = {
    [ADDING_TO_CART]: OperationInitialState,
    [CLEARING_CART]: OperationInitialState,
    [UPDATING_CART]: OperationInitialState,
    [FETCHING_CART]: LazyOperationInitialState,
    [REMOVING_FROM_CART]: LazyOperationInitialState,
    data: null,
};
