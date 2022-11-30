import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import { FETCH_SHOP_PRODUCTS_PREFIX, FETCH_SHOP_PRODUCTS_URL } from "./constants";
import { FetchingShopProductsResponse, FetchingShopProductsVars } from "./types";

export const fetchShopProducts = createAsyncThunk(
    FETCH_SHOP_PRODUCTS_PREFIX,
    async (vars: FetchingShopProductsVars, { rejectWithValue }) => {
        try {
            const res = await axios.post(FETCH_SHOP_PRODUCTS_URL, vars);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as FetchingShopProductsResponse };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);
