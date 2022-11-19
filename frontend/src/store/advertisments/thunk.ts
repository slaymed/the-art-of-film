import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Advertisment } from "./types";
import { RequestLifeCycle } from "../enums";
import { mapErrors } from "../../helpers/map-errors";
import {
    CREATE_ADVERTISE_PREFIX,
    CREATE_ADVERTISE_URL,
    FETCH_ADVERTISMENT_PREFIX,
    FETCH_ADVERTISMENT_URL,
} from "./constants";

export const fetchAdvertisment = createAsyncThunk(FETCH_ADVERTISMENT_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_ADVERTISMENT_URL);

        return { status: RequestLifeCycle.SUCCESS, data: res.data as Advertisment[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const createAdvertise = createAsyncThunk(
    CREATE_ADVERTISE_PREFIX,
    async (vars: Pick<Advertisment, "link" | "image" | "type" | "title">, { rejectWithValue }) => {
        try {
            const res = await axios.post(CREATE_ADVERTISE_URL, vars);

            return {
                status: RequestLifeCycle.SUCCESS,
                data: res.data as Pick<Advertisment, "_id">,
            };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);
