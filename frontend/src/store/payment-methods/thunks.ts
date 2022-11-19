import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import {
    ADD_CREDIT_CARD_PREFIX,
    ADD_CREDIT_CARD_URL,
    DEFAULT_A_CREDIT_CARD_PREFIX,
    DEFAULT_A_CREDIT_CARD_URL,
    DELETE_CREDIT_CARD_PREFIX,
    DELETE_CREDIT_CARD_URL,
    FETCH_CREDIT_CARDS_PREFIX,
    FETCH_CREDIT_CARDS_URL,
} from "./constants";
import { AddCreditCardVars, ICreditCard } from "./types";

export const fetchCreditCards = createAsyncThunk(FETCH_CREDIT_CARDS_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_CREDIT_CARDS_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as ICreditCard[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const defaultACreditCard = createAsyncThunk(
    DEFAULT_A_CREDIT_CARD_PREFIX,
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await axios.post(DEFAULT_A_CREDIT_CARD_URL, { pm_id: id });
            return { status: RequestLifeCycle.SUCCESS, data: res.data as ICreditCard[] };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const addCreditCard = createAsyncThunk(
    ADD_CREDIT_CARD_PREFIX,
    async (vars: AddCreditCardVars, { rejectWithValue }) => {
        try {
            const res = await axios.post(ADD_CREDIT_CARD_URL, vars);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as ICreditCard[] };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const deleteCreditCard = createAsyncThunk(DELETE_CREDIT_CARD_PREFIX, async (id: string, { rejectWithValue }) => {
    try {
        const res = await axios.post(DELETE_CREDIT_CARD_URL, { pm_id: id });
        return { status: RequestLifeCycle.SUCCESS, data: res.data as ICreditCard[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
