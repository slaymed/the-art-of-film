import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CreateEditPosterVars, IProduct } from "./types";
import { RequestLifeCycle } from "../enums";
import { mapErrors } from "../../helpers/map-errors";
import {
    CREATE_POSTER_PREFIX,
    CREATE_POSTER_URL,
    DELETE_POSTER_PREFIX,
    DELETE_POSTER_URL,
    FETCH_MY_PRODUCTS_PREFIX,
    FETCH_MY_PRODUCTS_URL,
    FETCH_HOME_PRODUCTS_PREFIX,
    FETCH_HOME_PRODUCTS_URL,
    FETCH_PRODUCT_PREFIX,
    FETCH_PRODUCT_URL,
    UPDATE_POSTER_PREFIX,
    UPDATE_POSTER_URL,
} from "./constants";

export const fetchHomeProducts = createAsyncThunk(FETCH_HOME_PRODUCTS_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_HOME_PRODUCTS_URL);

        return { status: RequestLifeCycle.SUCCESS, data: res.data as IProduct[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const fetchMyProducts = createAsyncThunk(FETCH_MY_PRODUCTS_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_MY_PRODUCTS_URL);

        return { status: RequestLifeCycle.SUCCESS, data: res.data as IProduct[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const createPoster = createAsyncThunk(
    CREATE_POSTER_PREFIX,
    async (vars: CreateEditPosterVars, { rejectWithValue }) => {
        try {
            const res = await axios.post(CREATE_POSTER_URL, vars);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as IProduct };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const updatePoster = createAsyncThunk(
    UPDATE_POSTER_PREFIX,
    async (vars: CreateEditPosterVars, { rejectWithValue }) => {
        try {
            const res = await axios.post(UPDATE_POSTER_URL, vars);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as IProduct };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const deletePoster = createAsyncThunk(DELETE_POSTER_PREFIX, async (productId: string, { rejectWithValue }) => {
    try {
        const res = await axios.post(DELETE_POSTER_URL, { productId });
        return { status: RequestLifeCycle.SUCCESS, data: res.data as Pick<IProduct, "_id"> };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const fetchSelectedProduct = createAsyncThunk(
    FETCH_PRODUCT_PREFIX,
    async (productId: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(FETCH_PRODUCT_URL + productId);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as IProduct };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);
