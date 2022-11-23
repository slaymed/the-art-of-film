import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import {
    CANCEL_WITHDRAW_REQUEST_PREFIX,
    CANCEL_WITHDRAW_REQUEST_URL,
    CREATE_WITHDRAW_REQUEST_PREFIX,
    CREATE_WITHDRAW_REQUEST_URL,
    FETCH_WITHDRAW_REQUESTS_PREFIX,
    FETCH_WITHDRAW_REQUESTS_URL,
} from "./constants";
import { CreateWithdrawRequestVars, WithdrawRequestsRes } from "./types";

export const fetchWithdrawRequests = createAsyncThunk(
    FETCH_WITHDRAW_REQUESTS_PREFIX,
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(FETCH_WITHDRAW_REQUESTS_URL);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as WithdrawRequestsRes };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.SUCCESS, errors: mapErrors(errors) });
        }
    }
);

export const createWithdrawRequest = createAsyncThunk(
    CREATE_WITHDRAW_REQUEST_PREFIX,
    async (vars: CreateWithdrawRequestVars, { rejectWithValue }) => {
        try {
            const res = await axios.post(CREATE_WITHDRAW_REQUEST_URL, vars);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as WithdrawRequestsRes };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.SUCCESS, errors: mapErrors(errors) });
        }
    }
);

export const cancelWithdrawRequest = createAsyncThunk(
    CANCEL_WITHDRAW_REQUEST_PREFIX,
    async (withdrawRequestId: string, { rejectWithValue }) => {
        try {
            const res = await axios.post(CANCEL_WITHDRAW_REQUEST_URL, { withdrawRequestId });
            return { status: RequestLifeCycle.SUCCESS, data: res.data as WithdrawRequestsRes };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.SUCCESS, errors: mapErrors(errors) });
        }
    }
);
