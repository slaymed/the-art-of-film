import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import {
    BUY_GIFT_SUB_PREFIX,
    BUY_GIFT_SUB_URL,
    FETCH_MY_GIFTS_PREFIX,
    FETCH_MY_GIFTS_URL,
    SYNC_GIFT_PREFIX,
    SYNC_GIFT_URL,
} from "./constants";
import { CreateGiftSubVars, IGift } from "./types";

export const fetchMyGifts = createAsyncThunk(FETCH_MY_GIFTS_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_MY_GIFTS_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as IGift[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const buyGiftSub = createAsyncThunk(
    BUY_GIFT_SUB_PREFIX,
    async (vars: CreateGiftSubVars, { rejectWithValue }) => {
        try {
            const res = await axios.post(BUY_GIFT_SUB_URL, vars);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as IGift };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const syncGift = createAsyncThunk(SYNC_GIFT_PREFIX, async (giftId: string, { rejectWithValue }) => {
    try {
        const res = await axios.get(SYNC_GIFT_URL + giftId);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as IGift };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
