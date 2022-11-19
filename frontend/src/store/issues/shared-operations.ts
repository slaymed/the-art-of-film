import { FETCHING, RAISING, SOLVING } from "./constants";
import { fetchIssues, raiseIssue, solveIssue } from "./thunks";

export const issueSharedOperations = [
    {
        thunk: raiseIssue,
        updatekey: RAISING,
    },
    {
        thunk: solveIssue,
        updatekey: SOLVING,
    },
    {
        thunk: fetchIssues,
        updatekey: FETCHING,
    },
];
