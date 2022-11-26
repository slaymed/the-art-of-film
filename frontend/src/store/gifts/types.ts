import { User } from "../auth/types";
import { Period } from "../enums";
import { GlobalOperation, TimeStamp } from "../types";
import { GiftType } from "./enums";

export interface IGift extends TimeStamp {
    _id: string;
    buyer: User;
    usedBy: User | null;
    used_at: number | null;
    code?: string;
    type: GiftType;
    period: Period;
    ref_id: string | null;
    targeted_ref_id: string;
    paid_at: number | null;
    is_paid: boolean;
}

export type CreateGiftSubVars = {
    period: Period;
    targeted_sub_id: string;
};

export interface IGiftState {
    list: IGift[];
    fetching: GlobalOperation;
    buying: GlobalOperation;
    syncing: GlobalOperation;
}
