import { createSelector } from "@reduxjs/toolkit";
import { GlobalOperation, RootState } from "../types";
import { ISetting } from "./types";

export const fetchingWebsiteSettings = createSelector(
    (state: RootState) => state.settings.fetchingWebsiteSettings,
    (fetchingWebsiteSettings: GlobalOperation) => fetchingWebsiteSettings
);

export const websiteSettings = createSelector(
    (state: RootState) => state.settings.websiteSettings,
    (websiteSettings: ISetting | null) => websiteSettings
);
