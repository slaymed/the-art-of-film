import { createSlice } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { AdvertismentInitialState } from "./initial-state";
import { createAdvertise, fetchAdvertisment } from "./thunk";
import { Advertisment } from "./types";

const slice = createSlice({
    name: "advertisments",
    initialState: AdvertismentInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        // FETCH ADVERTISMENTS OPERATION LIFE CYCLE
        addCase(fetchAdvertisment.pending, (advertisments) => {
            advertisments.fetching.loading = true;
        });
        addCase(fetchAdvertisment.fulfilled, (advertisments, { payload }) => {
            const { data: list } = payload;

            advertisments.list = list;
            advertisments.fetching.loading = false;
            advertisments.fetching.errors = globalMessage;
        });
        addCase(fetchAdvertisment.rejected, (advertisments, { payload }) => {
            const { errors } = payload as ThunkResponseType<Advertisment[], GlobalMessage>;

            if (errors) advertisments.fetching.errors = errors;
            advertisments.fetching.loading = false;
        });

        // CREATE ADVERTISE OPERATION LIFE CYCLE
        addCase(createAdvertise.pending, (advertisments) => {
            advertisments.create.loading = true;
        });
        addCase(createAdvertise.fulfilled, (advertisments, { payload }) => {
            const { data: advertise } = payload;

            advertisments.createdAdvertise = advertise;
            advertisments.create.loading = false;
            advertisments.create.errors = globalMessage;
        });
        addCase(createAdvertise.rejected, (advertisments, { payload }) => {
            const { errors } = payload as ThunkResponseType<Pick<Advertisment, "_id">, GlobalMessage>;

            if (errors) advertisments.create.errors = errors;
            advertisments.create.loading = false;
        });
    },
});

const advertismentReducer = slice.reducer;

export default advertismentReducer;
