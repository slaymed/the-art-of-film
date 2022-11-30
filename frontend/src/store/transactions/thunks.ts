import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import { FETCH_MY_TRANSACTIONS_PREFIX, FETCH_MY_TRANSACTIONS_URL } from "./constants";
import { FetchMyTransactionResponseType } from "./types";

export const fetchMyTransactions = createAsyncThunk(FETCH_MY_TRANSACTIONS_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_MY_TRANSACTIONS_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as FetchMyTransactionResponseType };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
