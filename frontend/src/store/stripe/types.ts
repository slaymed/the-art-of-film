import { Period } from "../enums";
import { GlobalMessage, GlobalOperation, TimeStamp } from "../types";
import { SessionStatus, SessionType } from "./enums";

export type Refund = {
    amount: number;
    url: string;
    refunded: boolean;
    refundedIn: number;
    currency: string;
};

export interface ISession extends TimeStamp {
    id: string;
    url: string;
    period: Period;
    status: SessionStatus;
    type: SessionType;
    ref: string;
    refund: Refund | null;
}

export interface IStripeState {
    create: GlobalOperation;
    cancel: GlobalOperation;
    currentSession: ISession | null;
}
