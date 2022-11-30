import { createSelector } from "@reduxjs/toolkit";

import { GlobalOperation, RootState } from "../types";
import { ITransaction } from "./types";

export const fetchingMyTransactions = createSelector(
    (state: RootState) => state.transactions.fetchingMyTransactions,
    (fetchingMyTransactions: GlobalOperation) => fetchingMyTransactions
);

export const myTransactions = createSelector(
    (state: RootState) => state.transactions.myTransactions,
    (myTransactions: ITransaction[]) => myTransactions
);

export const incomeTransactions = createSelector(
    (state: RootState) => state.transactions.incomeTransactions,
    (incomeTransactions: ITransaction[]) => incomeTransactions
);
