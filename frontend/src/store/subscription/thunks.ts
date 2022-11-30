import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import {
    FETCH_AVAILABLE_SUBSCRIPTIONS_PREFIX,
    FETCH_AVAILABLE_SUBSCRIPTIONS_URL,
    FETCH_CURRENT_SUBSCRIPTION_PREFIX,
    FETCH_CURRENT_SUBSCRIPTION_URL,
    REDEEM_GIFT_SUB_PREFIX,
    REDEEM_GIFT_SUB_URL,
    SUBSCRIBE_PREFIX,
    SUBSCRIBE_URL,
} from "./constants";
import { CurrentSub, ISubscription, SubscribeParams } from "./types";

export const fetchAvailableSubscriptions = createAsyncThunk(
    FETCH_AVAILABLE_SUBSCRIPTIONS_PREFIX,
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(FETCH_AVAILABLE_SUBSCRIPTIONS_URL);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as ISubscription[] };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const fetchCurrentSubscription = createAsyncThunk(
    FETCH_CURRENT_SUBSCRIPTION_PREFIX,
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(FETCH_CURRENT_SUBSCRIPTION_URL);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as CurrentSub };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const subscribe = createAsyncThunk(SUBSCRIBE_PREFIX, async (vars: SubscribeParams, { rejectWithValue }) => {
    try {
        const res = await axios.post(SUBSCRIBE_URL, vars);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as CurrentSub };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const redeemGiftSub = createAsyncThunk(REDEEM_GIFT_SUB_PREFIX, async (code: string, { rejectWithValue }) => {
    try {
        const res = await axios.post(REDEEM_GIFT_SUB_URL, { code });
        return { status: RequestLifeCycle.SUCCESS, data: res.data as CurrentSub };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
