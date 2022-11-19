import { User } from "../auth/types";
import { GlobalOperation } from "../types";

export type ShippingCost = {
    [key: string]: number;
    default: number;
};

export type RolledFolded = {
    rolled: number;
    folded: number;
};

export type RolledFoldedShippingCost = {
    [key: string]: RolledFolded;
    default: RolledFolded;
};

export interface ISellersState {
    topSellers: User[];
    fetching: GlobalOperation;
}
