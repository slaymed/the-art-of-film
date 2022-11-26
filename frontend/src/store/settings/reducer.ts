import { createSlice } from "@reduxjs/toolkit";
import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { SettingsInitialState } from "./initial-state";
import { fetchWebsiteSettings } from "./thunks";
import { ISetting } from "./types";

const slice = createSlice({
    name: "settings",
    initialState: SettingsInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        addCase(fetchWebsiteSettings.pending, (settings) => {
            settings.fetchingWebsiteSettings.loading = true;
        });
        addCase(fetchWebsiteSettings.fulfilled, (settings, { payload }) => {
            const { data: websiteSettings } = payload;

            settings.websiteSettings = websiteSettings;
            settings.fetchingWebsiteSettings.errors = globalMessage;
            settings.fetchingWebsiteSettings.loading = false;
        });
        addCase(fetchWebsiteSettings.rejected, (settings, { payload }) => {
            const { errors } = payload as ThunkResponseType<ISetting, GlobalMessage>;

            if (errors) settings.fetchingWebsiteSettings.errors = errors;
            settings.fetchingWebsiteSettings.loading = false;
        });
    },
});

const settingsReducer = slice.reducer;

export default settingsReducer;
