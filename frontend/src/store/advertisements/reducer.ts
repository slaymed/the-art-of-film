import { createSlice } from "@reduxjs/toolkit";

import { indexFound } from "../../helpers/index-found";
import { globalMessage } from "../initial-state";
import { ThunkResponseType } from "../types";
import { AdvertisementInitialState } from "./initial-state";
import { advertiseSharedOperations, visibleAdsSharedOperations } from "./shared-operations";
import { fetchAdvertisement, fetchHomeScreenAdvertisementBanner } from "./thunk";
import { Advertisement, AdvertisementOperationErrors } from "./types";

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
            advertisements.sync.errors = globalMessage;
        });
        addCase(fetchAdvertisement.rejected, (advertisements, { payload }) => {
            const { errors } = payload as ThunkResponseType<Advertisement[], AdvertisementOperationErrors>;

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
                advertisements.sync.errors = globalMessage;
                advertisements.fetching.errors = globalMessage;
            });
            addCase(thunk.rejected, (advertisements, { payload }) => {
                const { errors } = payload as ThunkResponseType<Advertisement, AdvertisementOperationErrors>;

                if (errors) advertisements[updateKey].errors = errors;
                advertisements[updateKey].loading = false;
            });
        }

        addCase(fetchHomeScreenAdvertisementBanner.pending, (advertisements) => {
            advertisements.fetchingHomeScreenBanner.loading = true;
        });
        addCase(fetchHomeScreenAdvertisementBanner.fulfilled, (advertisements, { payload }) => {
            const { data: homeScreenBanner } = payload;

            advertisements.homeScreenBanner = homeScreenBanner;

            advertisements.fetchingHomeScreenBanner.loading = false;
            advertisements.fetchingHomeScreenBanner.errors = globalMessage;
        });
        addCase(fetchHomeScreenAdvertisementBanner.rejected, (advertisements, { payload }) => {
            const { errors } = payload as ThunkResponseType<Advertisement, AdvertisementOperationErrors>;

            if (errors) advertisements.fetchingHomeScreenBanner.errors = errors;
            advertisements.fetchingHomeScreenBanner.loading = false;
        });

        for (const { thunk, updateKey, targetValue } of visibleAdsSharedOperations) {
            addCase(thunk.pending, (advertisements) => {
                advertisements[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (advertisements, { payload }) => {
                const { data: ads } = payload;

                const now_time = new Date().getTime();

                if (advertisements.adsLastFetch && advertisements.cashed.includes(updateKey)) {
                    if (now_time < advertisements.adsLastFetch + advertisements.adsCacheDuration) {
                        advertisements[updateKey].loading = false;
                        advertisements[updateKey].errors = globalMessage;
                        return;
                    }
                    advertisements.cashed = advertisements.cashed.filter((key) => key !== updateKey);
                }

                advertisements[targetValue] = ads;
                advertisements.adsLastFetch = new Date().getTime();
                advertisements.cashed.push(updateKey);
                advertisements[updateKey].loading = false;
                advertisements[updateKey].errors = globalMessage;
            });
            addCase(thunk.rejected, (advertisements, { payload }) => {
                const { errors } = payload as ThunkResponseType<Advertisement[], AdvertisementOperationErrors>;

                if (errors) advertisements[updateKey].errors = errors;
                advertisements[updateKey].loading = false;
            });
        }
    },
});

const advertisementReducer = slice.reducer;

export const { createAdvertisementErrorsRemoved } = slice.actions;

export default advertisementReducer;
