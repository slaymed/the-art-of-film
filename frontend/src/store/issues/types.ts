import { User } from "../auth/types";
import { GlobalOperation, TimeStamp } from "../types";

export type RaiseIssueVars = {
    orderId: string;
    becauseOf: string;
};

export interface IIssue extends TimeStamp {
    _id: string;
    order: string;
    becauseOf: string;
    user: User;
    solved: boolean;
    solvedAt: string;
}

export interface IIssuesState {
    list: IIssue[];
    fetching: GlobalOperation;
    raising: GlobalOperation;
    solving: GlobalOperation;
}
