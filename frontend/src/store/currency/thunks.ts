import { createAsyncThunk } from "@reduxjs/toolkit";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import { FETCH_RATES_PREFIX, FETCH_RATES_URL } from "./constants";
import { Rates } from "./types";

export const fetchRates = createAsyncThunk(FETCH_RATES_PREFIX, async (_, { rejectWithValue }) => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "psXfJZAfmpZaDvdNJB1fWhTjkLFdbnHU");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const res = await fetch(FETCH_RATES_URL, requestOptions);

        return { status: RequestLifeCycle.SUCCESS, data: (await res.json()) as Rates };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
