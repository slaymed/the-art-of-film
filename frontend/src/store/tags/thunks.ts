import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import { FETCH_POSTERS_TAGS_PREFIX, FETCH_POSTERS_TAGS_URL } from "./constants";
import { AllTags } from "./types";

export const fetchPostersTags = createAsyncThunk(FETCH_POSTERS_TAGS_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_POSTERS_TAGS_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as AllTags };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
