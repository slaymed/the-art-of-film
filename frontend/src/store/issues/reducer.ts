import { GlobalMessage, ThunkResponseType } from "./../types";
import { createSlice } from "@reduxjs/toolkit";
import { globalMessage } from "../initial-state";

import { IssuesInitialState } from "./initial-state";
import { issueSharedOperations } from "./shared-operations";
import { IIssue } from "./types";

const slice = createSlice({
    name: "issues",
    initialState: IssuesInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        for (const { thunk, updatekey } of issueSharedOperations) {
            addCase(thunk.pending, (issues) => {
                issues[updatekey].loading = true;
            });
            addCase(thunk.fulfilled, (issues, { payload }) => {
                const { data: list } = payload;

                list.sort((a, b) => {
                    const issueA = a.solved ? 1 : -1;
                    const issueB = b.solved ? 1 : -1;

                    return issueA - issueB;
                });

                issues.list = list;
                issues[updatekey].loading = false;
                issues[updatekey].errors = globalMessage;
            });
            addCase(thunk.rejected, (issues, { payload }) => {
                const { errors } = payload as ThunkResponseType<IIssue[], GlobalMessage>;

                if (errors) issues[updatekey].errors = errors;
                issues[updatekey].loading = false;
            });
        }
    },
});

const issuesReducer = slice.reducer;

export default issuesReducer;
