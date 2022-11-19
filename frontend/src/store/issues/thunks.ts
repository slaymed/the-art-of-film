import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { mapErrors } from "../../helpers/map-errors";
import { RequestLifeCycle } from "../enums";
import {
    FETCH_ISSUES_PREFIX,
    FETCH_ISSUES_URL,
    RAISE_ISSUE_PREFIX,
    RAISE_ISSUE_URL,
    SOLVE_ISSUE_PREFIX,
    SOLVE_ISSUE_URL,
} from "./constants";
import { IIssue, RaiseIssueVars } from "./types";

export const fetchIssues = createAsyncThunk(FETCH_ISSUES_PREFIX, async (orderId: string, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_ISSUES_URL + orderId);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as IIssue[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const raiseIssue = createAsyncThunk(RAISE_ISSUE_PREFIX, async (vars: RaiseIssueVars, { rejectWithValue }) => {
    try {
        console.log(vars);

        const res = await axios.post(RAISE_ISSUE_URL, vars);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as IIssue[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const solveIssue = createAsyncThunk(SOLVE_ISSUE_PREFIX, async (issueId: string, { rejectWithValue }) => {
    try {
        const res = await axios.post(SOLVE_ISSUE_URL, { issueId });
        return { status: RequestLifeCycle.SUCCESS, data: res.data as IIssue[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});
