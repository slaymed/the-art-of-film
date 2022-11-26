import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Advertisement, CreateEditAdvertiseVars } from "./types";
import { RequestLifeCycle } from "../enums";
import { mapErrors } from "../../helpers/map-errors";
import {
    CREATE_ADVERTISE_PREFIX,
    CREATE_ADVERTISE_URL,
    FETCH_ADVERTISEMENT_PREFIX,
    FETCH_ADVERTISEMENT_URL,
    SYNC_ADVERTISE_PREFIX,
    SYNC_ADVERTISE_URL,
    UPDATE_ADVERTISE_PREFIX,
    UPDATE_ADVERTISE_URL,
} from "./constants";

export const fetchAdvertisement = createAsyncThunk(FETCH_ADVERTISEMENT_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_ADVERTISEMENT_URL);

        return { status: RequestLifeCycle.SUCCESS, data: res.data as Advertisement[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const createAdvertise = createAsyncThunk(
    CREATE_ADVERTISE_PREFIX,
    async (vars: CreateEditAdvertiseVars, { rejectWithValue }) => {
        try {
            const res = await axios.post(CREATE_ADVERTISE_URL, vars);

            return {
                status: RequestLifeCycle.SUCCESS,
                data: res.data as Advertisement,
            };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const updateAdvertise = createAsyncThunk(
    UPDATE_ADVERTISE_PREFIX,
    async (vars: CreateEditAdvertiseVars, { rejectWithValue }) => {
        try {
            const res = await axios.post(UPDATE_ADVERTISE_URL, vars);

            return {
                status: RequestLifeCycle.SUCCESS,
                data: res.data as Advertisement,
            };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const syncAdvertise = createAsyncThunk(
    SYNC_ADVERTISE_PREFIX,
    async (advertisementId: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(SYNC_ADVERTISE_URL + advertisementId);

            return {
                status: RequestLifeCycle.SUCCESS,
                data: res.data as Advertisement,
            };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);
