import { Period } from "../enums";
import { GlobalOperation, TimeStamp } from "./../types";
import { GOLD, PLATINUM, SILVER } from "./constants";
import { SubscriptionStatus } from "./enums";

export type SubName = typeof SILVER | typeof GOLD | typeof PLATINUM;

export interface ISubscription extends TimeStamp {
    _id: string;
    name: SubName;
    itsPopular: boolean;
    monthPrice: number;
    yearPrice: number;
    perks: string[];
}

export type MappedSub = {
    cancel_at: number | null;
    cancel_at_period_end: boolean | null;
    canceled_at: number | null;
    created: number;
    current_period_end: number;
    current_period_start: number;
    customer: string;
    days_until_due: number | null;
    ended_at: number | null;
    metadata: { [key: string]: string };
    start_date: number;
    status: SubscriptionStatus;
    trial_end: number | null;
    trial_start: number | null;
    progress_percentage: number;
    billing: Period;
    price: number;
    sub: ISubscription;
};

export type NextSub = {
    charge_period: Period;
    start_date: number;
    sub: ISubscription;
};

export type Invoice = {
    hosted_invoice_url: string;
    invoice_pdf: string;
    amount_paid: number;
    paid: boolean;
};

export type CurrentSub = {
    sub_data: MappedSub;
    next_sub_data?: NextSub;
    invoice: Invoice;
};

export type SubscribeParams = {
    subscriptionId: string;
    charge_period: Period;
};

export interface ISubscriptionState {
    available: ISubscription[];
    fetchingAvailable: GlobalOperation;
    current: CurrentSub | null;
    fetchingCurrentSub: GlobalOperation;
    subscribe: GlobalOperation;
}
