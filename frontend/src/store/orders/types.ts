import { Address, User } from "../auth/types";
import { PaymentMethods } from "../cart/types";
import { IMessage } from "../chat/types";
import { GlobalOperation, TimeStamp } from "../types";

export type OrderItem = {
    _id: string;
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
};

export interface OrderIssue extends TimeStamp {
    _id: string;
    order: string;
    user: string;
    solved: boolean;
    becauseOf: string;
}

export interface IOrder extends TimeStamp {
    _id: string;
    shippingAddress: Address;
    orderItems: OrderItem[];
    paymentMethod: PaymentMethods;
    itemsPrice: number;
    taxPrice: number;
    shippingCost: number;
    totalPrice: number;
    user: User;
    seller: User;
    isPaid: boolean;
    paidAt: string;
    isDelivered: boolean;
    deliveredAt: string;
    isRecieved: boolean;
    recievedAt: string;
    allowToPay: boolean;
    chatId: string;
    haveIssue: boolean;
    issueId: string;
}

export interface IOrdersState {
    fetching: GlobalOperation;
    create: GlobalOperation;
    delete: GlobalOperation;
    changingStatus: GlobalOperation;
    sync: GlobalOperation;
    list: IOrder[];
}
