import { createSelector } from "@reduxjs/toolkit";
import { GlobalOperation, RootState } from "../types";
import { IIssue } from "./types";

export const fetchingIssues = createSelector(
    (state: RootState) => state.issues.fetching,
    (fetching: GlobalOperation) => fetching
);

export const raisingIssue = createSelector(
    (state: RootState) => state.issues.raising,
    (raising: GlobalOperation) => raising
);

export const solvingIssue = createSelector(
    (state: RootState) => state.issues.solving,
    (solving: GlobalOperation) => solving
);

export const issuesList = createSelector(
    (state: RootState) => state.issues.list,
    (list: IIssue[]) => list
);
