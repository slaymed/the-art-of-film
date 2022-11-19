import { OperationInitialState } from "../initial-state";
import { ISellersState } from "./types";

export const SellersInitialState: ISellersState = {
    fetching: OperationInitialState,
    topSellers: [],
};
