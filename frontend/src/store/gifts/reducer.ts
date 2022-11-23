import { GlobalMessage, ThunkResponseType } from "./../types";
import { createSlice } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { GiftsInitialState } from "./initial-state";
import { fetchMyGifts } from "./thunks";
import { IGift } from "./types";
import { giftsSharedOperation } from "./shared-operations";
import { indexFound } from "../../helpers/index-found";

const slice = createSlice({
    name: "gifts",
    initialState: GiftsInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        addCase(fetchMyGifts.pending, (gifts) => {
            gifts.fetching.loading = true;
        });
        addCase(fetchMyGifts.fulfilled, (gifts, { payload }) => {
            const { data: list } = payload;

            gifts.list = list;
            gifts.fetching.errors = globalMessage;
            gifts.fetching.loading = false;
        });
        addCase(fetchMyGifts.rejected, (gifts, { payload }) => {
            const { errors } = payload as ThunkResponseType<IGift[], GlobalMessage>;

            if (errors) gifts.fetching.errors = errors;
            gifts.fetching.loading = false;
        });

        for (const { thunk, updateKey } of giftsSharedOperation) {
            addCase(thunk.pending, (gifts) => {
                gifts[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (gifts, { payload }) => {
                const { data: gift } = payload;

                const index = gifts.list.findIndex((g) => g._id === gift._id);
                if (indexFound(index)) gifts.list[index] = gift;
                if (!indexFound(index)) gifts.list.unshift(gift);

                gifts[updateKey].errors = globalMessage;
                gifts[updateKey].loading = false;
            });
            addCase(thunk.rejected, (gifts, { payload }) => {
                const { errors } = payload as ThunkResponseType<IGift, GlobalMessage>;

                if (errors) gifts[updateKey].errors = errors;
                gifts[updateKey].loading = false;
            });
        }
    },
});

const giftsReducer = slice.reducer;

export default giftsReducer;
