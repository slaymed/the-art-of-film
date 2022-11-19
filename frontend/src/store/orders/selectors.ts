import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation, RootState } from "../types";
import { IOrder } from "./types";

export const creatingOrder = createSelector(
    (state: RootState) => state.orders.create,
    (create: GlobalOperation) => create
);

export const removingOrder = createSelector(
    (state: RootState) => state.orders.delete,
    (remove: GlobalOperation) => remove
);

export const ordersList = createSelector(
    (state: RootState) => state.orders.list,
    (list: IOrder[]) => list
);

export const fetchingOrders = createSelector(
    (state: RootState) => state.orders.fetching,
    (fetching: GlobalOperation) => fetching
);

export const orderSelector = (orderId: string) =>
    createSelector(
        (state: RootState) => state.orders.list,
        (list: IOrder[]) => list.find((order) => order._id === orderId) || null
    );

export const syncingOrder = createSelector(
    (state: RootState) => state.orders.sync,
    (sync: GlobalOperation) => sync
);

export const changingStatus = createSelector(
    (state: RootState) => state.orders.changingStatus,
    (changingStatus: GlobalOperation) => changingStatus
);
