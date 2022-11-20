import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import {
    FETCH_SELECTED_SELLER_SHOWCASE_PREFIX,
    FETCH_SELECTED_SELLER_SHOWCASE_URL,
    FETCH_SHOWCASE_LIST_PREFIX,
    FETCH_SHOWCASE_LIST_URL,
    FETCH_TOP_SELLERS_SHOWCASE_LIST_PREFIX,
    FETCH_TOP_SELLERS_SHOWCASE_LIST_URL,
} from "./constants";
import { IShowcase } from "./types";

export const fetchSellerShowcase = createAsyncThunk(
    FETCH_SELECTED_SELLER_SHOWCASE_PREFIX,
    async (sellerId: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(FETCH_SELECTED_SELLER_SHOWCASE_URL + sellerId);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as IShowcase };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const fetchSellersShowcaseList = createAsyncThunk(FETCH_SHOWCASE_LIST_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_SHOWCASE_LIST_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as Pick<IShowcase, "seller">[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const fetchTopSellersShowcaseList = createAsyncThunk(
    FETCH_TOP_SELLERS_SHOWCASE_LIST_PREFIX,
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(FETCH_TOP_SELLERS_SHOWCASE_LIST_URL);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as Pick<IShowcase, "seller">[] };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);
