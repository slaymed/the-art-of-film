import { LazyOperationInitialState, OperationInitialState } from "../initial-state";
import { FETCHING, RAISING, SOLVING } from "./constants";
import { IIssuesState } from "./types";

export const IssuesInitialState: IIssuesState = {
    [FETCHING]: LazyOperationInitialState,
    [RAISING]: OperationInitialState,
    [SOLVING]: OperationInitialState,
    list: [],
};
