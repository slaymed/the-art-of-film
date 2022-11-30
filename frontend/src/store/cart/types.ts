import { Address } from "../auth/types";
import { IProduct } from "../products/types";
import { GlobalMessage, GlobalOperation, TimeStamp } from "../types";
import { STRIPE } from "./constants";

export type PaymentMethods = typeof STRIPE;

export interface ICart extends TimeStamp {
    items: IProduct[];
    shippingAddress: Address;
    paymentMethod: PaymentMethods;
    itemsPrice: number;
    totalPrice: number;
}

export interface ICartState {
    adding: GlobalOperation;
    clearing: GlobalOperation;
    updating: GlobalOperation;
    fetching: GlobalOperation;
    removing: GlobalOperation;
    data: ICart | null;
}
