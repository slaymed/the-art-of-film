import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import { FETCH_WEBSITE_SETTINGS_PREFIX, FETCH_WEBSITE_SETTINGS_URL } from "./constants";
import { ISetting } from "./types";

export const fetchWebsiteSettings = createAsyncThunk(FETCH_WEBSITE_SETTINGS_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_WEBSITE_SETTINGS_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as ISetting };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
