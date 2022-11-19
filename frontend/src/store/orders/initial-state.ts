import { OperationInitialState } from "../initial-state";
import { CREATE_ORDER, CHANGING_ORDER_STATUS, SYNC_ORDER, DELETE_ORDER } from "./constants";
import { IOrdersState } from "./types";

export const OrdersInitialState: IOrdersState = {
    [CREATE_ORDER]: OperationInitialState,
    [DELETE_ORDER]: OperationInitialState,
    [SYNC_ORDER]: OperationInitialState,
    [CHANGING_ORDER_STATUS]: OperationInitialState,
    fetching: OperationInitialState,
    list: [],
};
