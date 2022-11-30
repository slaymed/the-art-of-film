import { OperationInitialState } from "../initial-state";
import { ITransactionsState } from "./types";

export const TransactionsInitialState: ITransactionsState = {
    fetchingMyTransactions: OperationInitialState,
    incomeTransactions: [],
    myTransactions: [],
};
