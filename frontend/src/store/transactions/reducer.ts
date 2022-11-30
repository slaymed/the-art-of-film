import { createSlice } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { TransactionsInitialState } from "./initial-state";
import { fetchMyTransactions } from "./thunks";
import { ITransaction } from "./types";

const slice = createSlice({
    name: "transactions",
    initialState: TransactionsInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        addCase(fetchMyTransactions.pending, (transactions) => {
            transactions.fetchingMyTransactions.loading = true;
        });
        addCase(fetchMyTransactions.fulfilled, (transactions, { payload }) => {
            const { data: myTransactions } = payload;

            transactions.myTransactions = myTransactions.paid;
            transactions.incomeTransactions = myTransactions.income;
            transactions.fetchingMyTransactions.errors = globalMessage;
            transactions.fetchingMyTransactions.loading = false;
        });
        addCase(fetchMyTransactions.rejected, (transactions, { payload }) => {
            const { errors } = payload as ThunkResponseType<ITransaction[], GlobalMessage>;

            transactions.myTransactions = [];
            transactions.incomeTransactions = [];
            if (errors) transactions.fetchingMyTransactions.errors = errors;
            transactions.fetchingMyTransactions.loading = false;
        });
    },
});

const transactionsReducer = slice.reducer;

export default transactionsReducer;
