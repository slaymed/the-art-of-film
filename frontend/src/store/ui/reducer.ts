import { createSlice } from "@reduxjs/toolkit";
import { UiInitialState } from "./initial-state";

const slice = createSlice({
    name: "ui",
    initialState: UiInitialState,
    reducers: {
        sideNavToggled(ui) {
            ui.sideNavActive = !ui.sideNavActive;
        },
    },
});

const uiReducer = slice.reducer;

export const { sideNavToggled } = slice.actions;

export default uiReducer;
