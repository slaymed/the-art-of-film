import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { UPLOAD_FILE_PREFIX, UPLOAD_FILE_URL } from "./constants";
import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import { UploadResponse } from "./types";

export const uploadFile = createAsyncThunk(UPLOAD_FILE_PREFIX, async (file: File, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(UPLOAD_FILE_URL, formData);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as UploadResponse };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
