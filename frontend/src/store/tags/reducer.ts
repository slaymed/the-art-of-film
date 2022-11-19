import { GlobalMessage, ThunkResponseType } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { globalMessage } from "../initial-state";
import { TagsInitialState } from "./initial-state";
import { fetchPostersTags } from "./thunks";
import { ITag } from "./types";

const slice = createSlice({
    name: "tags",
    initialState: TagsInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        addCase(fetchPostersTags.pending, (tags) => {
            tags.fetching.loading = true;
        });
        addCase(fetchPostersTags.fulfilled, (tags, { payload }) => {
            const { data: allTags } = payload;

            tags.artistes = allTags.artistes;
            tags.casts = allTags.casts;
            tags.directors = allTags.directors;
            tags.fetching.loading = false;
            tags.fetching.errors = globalMessage;
        });
        addCase(fetchPostersTags.rejected, (tags, { payload }) => {
            const { errors } = payload as ThunkResponseType<ITag, GlobalMessage>;

            tags.fetching.loading = false;
            if (errors) tags.fetching.errors = errors;
        });
    },
});

const tagsReducer = slice.reducer;

export default tagsReducer;
