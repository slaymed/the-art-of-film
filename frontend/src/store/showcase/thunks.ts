import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import { FETCH_SELECTED_SELLER_SHOWCASE_PREFIX, FETCH_SELECTED_SELLER_SHOWCASE_URL } from "./constants";
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
