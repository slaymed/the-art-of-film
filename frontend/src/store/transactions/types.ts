import { User } from "../auth/types";
import { GlobalOperation, TimeStamp } from "../types";
import { TransactionType } from "./enums";

export interface ITransaction extends TimeStamp {
    _id: string;
    by: User | null;
    to: User | null;
    total_collected_amount: number;
    commission_percentage: number;
    total_commission_fee: number;
    total_release_amount_after_fee: number;
    collected: boolean;
    collected_at: number | null;
    refunded: boolean;
    refunded_at: number | null;
    released: boolean;
    released_at: number | null;
    type: TransactionType;
    ref: string;
    session: string;
}

export type FetchMyTransactionResponseType = {
    paid: ITransaction[];
    income: ITransaction[];
};

export interface ITransactionsState {
    myTransactions: ITransaction[];
    incomeTransactions: ITransaction[];
    fetchingMyTransactions: GlobalOperation;
}
