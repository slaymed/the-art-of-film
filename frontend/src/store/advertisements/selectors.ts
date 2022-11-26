import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../types";
import { Advertisement, AdvertiseOperation } from "./types";

export const fetchingAdvertisements = createSelector(
    (state: RootState) => state.advertisements.fetching,
    (fetching: AdvertiseOperation) => fetching
);

export const creatingAdvertisement = createSelector(
    (state: RootState) => state.advertisements.create,
    (create: AdvertiseOperation) => create
);

export const updatingAdvertisement = createSelector(
    (state: RootState) => state.advertisements.update,
    (update: AdvertiseOperation) => update
);

export const syncingAdvertisement = createSelector(
    (state: RootState) => state.advertisements.sync,
    (sync: AdvertiseOperation) => sync
);

export const advertisementsSelector = createSelector(
    (state: RootState) => state.advertisements.list,
    (advertisements: Advertisement[]) => advertisements
);

export const selectAdvertiseById = (id?: string) =>
    createSelector(
        (state: RootState) => state.advertisements.list.find((ad) => ad._id === id),
        (advertisement?: Advertisement) => advertisement
    );
