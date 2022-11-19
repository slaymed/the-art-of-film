import { GlobalOperation } from "../types";
import { MASTERCARD, VISA } from "./constants";

export interface PaymentMethodAddress {
    city: string;
    country: string;
    line1: string;
    line2?: string;
    postal_code: string;
    state: string;
}

export interface IBillingDetail {
    email: string;
    name: string;
    phone: string;
    address: PaymentMethodAddress;
}

export interface AddCreditCardVars {
    address?: PaymentMethodAddress;
    name: string;
    number: number;
    exp_month: number;
    exp_year: number;
    cvc: string;
    phone: string;
    useMyAccountName: boolean;
    useMyAccountAddress: boolean;
}

export type CreditCardErrors = {
    name?: string;
    number?: number;
    exp_month?: number;
    exp_year?: number;
    cvc?: string;
    phone?: string;
    address?: PaymentMethodAddress;
    message: string;
};

export type CreditCardOperation = {
    loading: boolean;
    errors: CreditCardErrors;
};

export type CreditCardBrand = typeof VISA | typeof MASTERCARD;

export interface ICreditCard {
    last4: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
    billing_details: IBillingDetail;
    id: string;
    default: boolean;
    brand: CreditCardBrand;
}

export interface IPaymentMethodsState {
    creditCards: ICreditCard[];
    bankAccounts: any[];
    fetchingCreditCards: CreditCardOperation;
    fetchingBankAccounts: CreditCardOperation;
    defaultingCreditCard: CreditCardOperation;
    addingCreditCard: CreditCardOperation;
    deletingCreditCard: CreditCardOperation;
}
