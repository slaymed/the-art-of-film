import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";

export const sideBarVisible = createSelector(
    (state: RootState) => state.ui.sideNavActive,
    (sideNavActive: boolean) => sideNavActive
);
