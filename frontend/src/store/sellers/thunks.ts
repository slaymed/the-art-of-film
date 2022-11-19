import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { User } from "../auth/types";
import { RequestLifeCycle } from "./../enums";
import { mapErrors } from "../../helpers/map-errors";
import { FETCH_TOP_SELLERS_PREFIX, FETCH_TOP_SELLERS_URL } from "./constants";

export const fetchTopSellers = createAsyncThunk(FETCH_TOP_SELLERS_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_TOP_SELLERS_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as User[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
