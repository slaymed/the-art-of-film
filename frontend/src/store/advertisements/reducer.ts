import { createSlice } from "@reduxjs/toolkit";
import { indexFound } from "../../helpers/index-found";

import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { AdvertisementInitialState } from "./initial-state";
import { advertiseSharedOperations } from "./shared-operations";
import { createAdvertise, fetchAdvertisement } from "./thunk";
import { Advertisement, CreateEditAdvertiseErrors } from "./types";

const slice = createSlice({
    name: "advertisements",
    initialState: AdvertisementInitialState,
    reducers: {
        createAdvertisementErrorsRemoved(advertisements) {
            advertisements.create.errors = globalMessage;
        },
    },
    extraReducers({ addCase }) {
        addCase(fetchAdvertisement.pending, (advertisements) => {
            advertisements.fetching.loading = true;
        });
        addCase(fetchAdvertisement.fulfilled, (advertisements, { payload }) => {
            const { data: list } = payload;

            advertisements.list = list;
            advertisements.fetching.loading = false;
            advertisements.fetching.errors = globalMessage;
        });
        addCase(fetchAdvertisement.rejected, (advertisements, { payload }) => {
            const { errors } = payload as ThunkResponseType<Advertisement[], CreateEditAdvertiseErrors>;

            if (errors) advertisements.fetching.errors = errors;
            advertisements.fetching.loading = false;
        });

        for (const { thunk, updateKey } of advertiseSharedOperations) {
            addCase(thunk.pending, (advertisements) => {
                advertisements[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (advertisements, { payload }) => {
                const { data: advertise } = payload;

                const index = advertisements.list.findIndex((ad) => ad._id === advertise._id);
                if (indexFound(index)) advertisements.list[index] = advertise;
                if (!indexFound(index)) advertisements.list.unshift(advertise);

                advertisements[updateKey].loading = false;
                advertisements[updateKey].errors = globalMessage;
            });
            addCase(thunk.rejected, (advertisements, { payload }) => {
                const { errors } = payload as ThunkResponseType<Pick<Advertisement, "_id">, CreateEditAdvertiseErrors>;

                if (errors) advertisements[updateKey].errors = errors;
                advertisements[updateKey].loading = false;
            });
        }
    },
});

const advertisementReducer = slice.reducer;

export const { createAdvertisementErrorsRemoved } = slice.actions;

export default advertisementReducer;
