import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import {
    CANCEL_CHECKOUT_SESSION_PREFIX,
    CANCEL_CHECKOUT_SESSION_URL,
    CREATE_ADVERTISE_CHECKOUT_SESSION_PREFIX,
    CREATE_ADVERTISE_CHECKOUT_SESSION_URL,
    CREATE_GIFT_SUB_CHECKOUT_SESSION_PREFIX,
    CREATE_GIFT_SUB_CHECKOUT_SESSION_URL,
    CREATE_ORDER_CHECKOUT_SESSION_PREFIX,
    CREATE_ORDER_CHECKOUT_SESSION_URL,
} from "./constants";
import { ISession } from "./types";

import { socket } from "../../App";

export const createAdvertiseSession = createAsyncThunk(
    CREATE_ADVERTISE_CHECKOUT_SESSION_PREFIX,
    async (advertiseId: string, { rejectWithValue }) => {
        try {
            const res = await axios.post(CREATE_ADVERTISE_CHECKOUT_SESSION_URL, { advertiseId, socketId: socket.id });
            return { status: RequestLifeCycle.SUCCESS, data: res.data as ISession };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const createOrderSession = createAsyncThunk(
    CREATE_ORDER_CHECKOUT_SESSION_PREFIX,
    async (orderId: string, { rejectWithValue }) => {
        try {
            const res = await axios.post(CREATE_ORDER_CHECKOUT_SESSION_URL, { orderId, socketId: socket.id });
            return { status: RequestLifeCycle.SUCCESS, data: res.data as ISession };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const createGiftSubSession = createAsyncThunk(
    CREATE_GIFT_SUB_CHECKOUT_SESSION_PREFIX,
    async (giftId: string, { rejectWithValue }) => {
        try {
            const res = await axios.post(CREATE_GIFT_SUB_CHECKOUT_SESSION_URL, { giftId, socketId: socket.id });
            return { status: RequestLifeCycle.SUCCESS, data: res.data as ISession };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const cancelSession = createAsyncThunk(
    CANCEL_CHECKOUT_SESSION_PREFIX,
    async (session: ISession, { rejectWithValue }) => {
        try {
            const res = await axios.post(CANCEL_CHECKOUT_SESSION_URL, { sessionId: session.id });
            return { status: RequestLifeCycle.SUCCESS, data: res.data as ISession };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);
