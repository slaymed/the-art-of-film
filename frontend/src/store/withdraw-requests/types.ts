import { GlobalOperation, TimeStamp } from "../types";
import { User } from "./../auth/types";
import { AccountType, WithdrawStatus } from "./enums";

export type Paypal_Account = {
    email: string;
};

export type Bank_Account = {
    account_name: string;
    account_number?: string;
    account_sort_code?: string;
};

export type WithdrawTo = {
    accountType: AccountType;
    bank_account: Bank_Account | null;
    paypal_account: Paypal_Account | null;
};

export interface WithdrawRequest extends TimeStamp {
    _id: string;
    user: string;
    amount: number;
    to: WithdrawTo;
    status: WithdrawStatus;
    rejected_because: string | null;
}

export type CreateWithdrawRequestVars = {
    amount: number;
    to: AccountType;
    bank_account?: Bank_Account;
    paypal_account?: Paypal_Account;
};

export interface WithdrawRequestErrors {
    amount?: string;
    bank_account_errors?: {
        account_name: string;
        account_number: string;
        account_sort_code: string;
    };
    paypal_account_errors?: { email: string };
    message: string;
}

export type WithdrawRequestsMap = {
    paid: WithdrawRequest[];
    pending: WithdrawRequest[];
    rejected: WithdrawRequest[];
};

export type WithdrawRequestsRes = {
    requests: WithdrawRequestsMap;
    user: User;
};

export type WithdrawRequestOperation = {
    loading: boolean;
    errors: WithdrawRequestErrors;
};

export interface IWithdrawRequestsState extends WithdrawRequestsMap {
    fetching: WithdrawRequestOperation;
    adding: WithdrawRequestOperation;
    canceling: WithdrawRequestOperation;
}
