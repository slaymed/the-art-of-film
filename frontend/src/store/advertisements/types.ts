import { User } from "../auth/types";
import { GlobalOperation } from "../types";
import { AdvertisementType } from "./enums";

export type Advertisement = {
    _id: string;
    type: AdvertisementType;
    title: string;
    link: string;
    image: string;
    active: boolean;
    paragraphs: string[];
    images: string[];
    activated_at: number | null;
    user: User | null;
    period_time: number;
    payment_record: string;
    approved: boolean;
    private_key: string | null;
};

export type CreateEditAdvertiseVars = Partial<{
    advertisementId: string;
    type: AdvertisementType;
    title: string;
    link: string;
    image: string;
    paragraphs: string[];
    images: string[];
    period_days: string;
    private_key: string;
}>;

export type CreateEditAdvertiseErrors = Partial<{
    title: string;
    image: string;
    link: string;
    period_days: string;
    message: string;
}>;

export type AdvertiseOperation = {
    loading: boolean;
    errors: CreateEditAdvertiseErrors;
};

export interface IAdvertisementState {
    fetching: AdvertiseOperation;
    create: AdvertiseOperation;
    update: AdvertiseOperation;
    sync: AdvertiseOperation;
    list: Advertisement[];
}
