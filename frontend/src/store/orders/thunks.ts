import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import {
    CREATE_ORDER_PREFIX,
    CREATE_ORDER_URL,
    DELETE_ORDER_PREFIX,
    DELETE_ORDER_URL,
    FETCH_ORDERS_PREFIX,
    FETCH_ORDERS_URL,
    MARK_ORDER_DELIVERED_PREFIX,
    MARK_ORDER_DELIVERED_URL,
    MARK_ORDER_RECIEVED_PREFIX,
    MARK_ORDER_RECIEVED_URL,
    SYNC_ORDER_PREFIX,
    SYNC_ORDER_URL,
} from "./constants";
import { IOrder } from "./types";

export const createOrder = createAsyncThunk(CREATE_ORDER_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.post(CREATE_ORDER_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as IOrder };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const syncOrder = createAsyncThunk(SYNC_ORDER_PREFIX, async (orderId: string, { rejectWithValue }) => {
    try {
        const res = await axios.post(SYNC_ORDER_URL, { orderId });
        return { status: RequestLifeCycle.SUCCESS, data: res.data as IOrder };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const fetchOrders = createAsyncThunk(FETCH_ORDERS_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_ORDERS_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as IOrder[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const markOrderAsDelivered = createAsyncThunk(
    MARK_ORDER_DELIVERED_PREFIX,
    async (orderId: string, { rejectWithValue }) => {
        try {
            const res = await axios.post(MARK_ORDER_DELIVERED_URL, { orderId });
            return { status: RequestLifeCycle.SUCCESS, data: res.data as IOrder };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const markOrderAsRecieved = createAsyncThunk(
    MARK_ORDER_RECIEVED_PREFIX,
    async (orderId: string, { rejectWithValue }) => {
        try {
            const res = await axios.post(MARK_ORDER_RECIEVED_URL, { orderId });
            return { status: RequestLifeCycle.SUCCESS, data: res.data as IOrder };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const deleteOrder = createAsyncThunk(DELETE_ORDER_PREFIX, async (orderId: string, { rejectWithValue }) => {
    try {
        const res = await axios.post(DELETE_ORDER_URL, { orderId });
        return { status: RequestLifeCycle.SUCCESS, data: res.data as IOrder };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
