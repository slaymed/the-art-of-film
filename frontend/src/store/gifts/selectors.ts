import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation, RootState } from "../types";
import { IGift } from "./types";

export const buyingGift = createSelector(
    (state: RootState) => state.gifts.buying,
    (buying: GlobalOperation) => buying
);

export const fetchingGifts = createSelector(
    (state: RootState) => state.gifts.fetching,
    (fetching: GlobalOperation) => fetching
);

export const syncingGifts = createSelector(
    (state: RootState) => state.gifts.syncing,
    (syncing: GlobalOperation) => syncing
);

export const giftsList = createSelector(
    (state: RootState) => state.gifts.list,
    (list: IGift[]) => list
);

export const selectGiftById = (giftId?: string) =>
    createSelector(
        (state: RootState) => state.gifts.list.find((g) => g._id === giftId),
        (gift?: IGift) => gift
    );
