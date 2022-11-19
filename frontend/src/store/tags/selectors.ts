import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation } from "./../types";
import { RootState } from "../types";
import { ITag } from "./types";

export const castsSelector = createSelector(
    (state: RootState) => state.tags.casts,
    (casts: ITag[]) => casts
);

export const artistesSelector = createSelector(
    (state: RootState) => state.tags.artistes,
    (artistes: ITag[]) => artistes
);

export const directorsSelector = createSelector(
    (state: RootState) => state.tags.directors,
    (directors: ITag[]) => directors
);

export const fetchingPosterTag = createSelector(
    (state: RootState) => state.tags.fetching,
    (fetching: GlobalOperation) => fetching
);

export const selectDirectors = (directors: string[]) =>
    createSelector(
        (state: RootState) =>
            directors.map((value) => state.tags.directors.find((d) => d.name.toLowerCase() === value.toLowerCase())),
        (directors: (ITag | undefined)[]) => directors
    );

export const selectCasts = (casts: string[]) =>
    createSelector(
        (state: RootState) =>
            casts.map((value) => state.tags.casts.find((c) => c.name.toLowerCase() === value.toLowerCase())),
        (casts: (ITag | undefined)[]) => casts
    );

export const selectArtistes = (artistes: string[]) =>
    createSelector(
        (state: RootState) =>
            artistes.map((value) => state.tags.artistes.find((a) => a.name.toLowerCase() === value.toLowerCase())),
        (artistes: (ITag | undefined)[]) => artistes
    );
