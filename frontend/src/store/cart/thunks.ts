import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
    ADD_TO_CART_PREFIX,
    ADD_TO_CART_URL,
    CLEAR_CART_PREFIX,
    CLEAR_CART_URL,
    FETCH_CART_PREFIX,
    FETCH_CART_URL,
    UPDATE_CART_SHIPPING_ADDRESS_PREFIX,
    UPDATE_CART_SHIPPING_ADDRESS_URL,
} from "./constants";
import { RequestLifeCycle } from "../enums";
import { mapErrors } from "../../helpers/map-errors";
import { ICart } from "./types";
import { Address } from "../auth/types";

export const addToCart = createAsyncThunk(ADD_TO_CART_PREFIX, async (productId: string, { rejectWithValue }) => {
    try {
        const res = await axios.post(ADD_TO_CART_URL, { productId });
        return { status: RequestLifeCycle.SUCCESS, data: res.data as ICart };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const clearCart = createAsyncThunk(CLEAR_CART_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.post(CLEAR_CART_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as ICart };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const updateCartShippingAddress = createAsyncThunk(
    UPDATE_CART_SHIPPING_ADDRESS_PREFIX,
    async (shippingAddress: Address, { rejectWithValue }) => {
        try {
            const res = await axios.post(UPDATE_CART_SHIPPING_ADDRESS_URL, shippingAddress);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as ICart };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);
export const fetchCart = createAsyncThunk(FETCH_CART_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_CART_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as ICart };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
