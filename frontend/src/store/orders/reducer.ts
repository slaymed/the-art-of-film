import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { OrdersInitialState } from "./initial-state";
import { ordersSharedOperations } from "./shared-operations";
import { fetchOrders } from "./thunks";
import { IOrder } from "./types";

const slice = createSlice({
    name: "orders",
    initialState: OrdersInitialState,
    reducers: {
        orderRecieved_RT(orders, { payload: order }: PayloadAction<IOrder>) {
            if (!order) return;

            const orderIndex = orders.list.findIndex((o) => o._id === order._id);

            if (orderIndex > -1) {
                if (JSON.stringify(orders.list[orderIndex]) !== JSON.stringify(order)) orders.list[orderIndex] = order;
                return;
            }

            orders.list.unshift(order);
        },
        orderRemoved_RT(orders, { payload: orderId }: PayloadAction<string>) {
            const orderIndex = orders.list.findIndex((o) => o._id === orderId);
            if (orderIndex > -1) orders.list.splice(orderIndex, 1);
        },
    },
    extraReducers({ addCase }) {
        for (const { thunk, updateKey } of ordersSharedOperations) {
            addCase(thunk.pending, (orders) => {
                orders[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (orders, { payload, meta }) => {
                const { data: order } = payload;
                const { arg: orderId } = meta;

                if (order === null) {
                    const orderIndex = orders.list.findIndex((o) => o._id === orderId);
                    if (orderIndex > -1) orders.list.splice(orderIndex, 1);

                    orders[updateKey].loading = false;
                    orders[updateKey].errors = globalMessage;

                    return;
                }

                const index = orders.list.findIndex((o) => o._id === order._id);

                if (index > -1) {
                    orders[updateKey].loading = false;
                    if (JSON.stringify(orders.list[index]) !== JSON.stringify(order)) {
                        orders.list[index] = order;
                    }
                    orders[updateKey].errors = globalMessage;
                    return;
                }

                orders.list.push(order);
                orders[updateKey].loading = false;
                orders[updateKey].errors = globalMessage;
            });
            addCase(thunk.rejected, (orders, { payload }) => {
                const { errors } = payload as ThunkResponseType<IOrder, GlobalMessage>;

                if (errors) orders[updateKey].errors = errors;
                orders[updateKey].loading = false;
            });
        }

        addCase(fetchOrders.pending, (orders) => {
            orders.fetching.loading = true;
        });
        addCase(fetchOrders.fulfilled, (orders, { payload }) => {
            const { data: list } = payload;

            orders.list = list;
            orders.fetching.loading = false;
            orders.fetching.errors = globalMessage;
        });
        addCase(fetchOrders.rejected, (orders, { payload }) => {
            const { errors } = payload as ThunkResponseType<IOrder[], GlobalMessage>;

            if (errors) orders.fetching.errors = errors;
            orders.fetching.loading = false;
        });
    },
});

const ordersReducer = slice.reducer;

export const { orderRecieved_RT, orderRemoved_RT } = slice.actions;

export default ordersReducer;
