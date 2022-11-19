import { User } from "../auth/types";
import { IOrder } from "../orders/types";
import { GlobalOperation, TimeStamp } from "../types";
import { SelectedChatList } from "./enums";

export interface IMessage extends TimeStamp {
    _id: string;
    from: string;
    body: string;
    chatId: string;
    sending?: boolean;
    failed?: boolean;
    isStatus?: boolean;
}

export interface IChat extends TimeStamp {
    _id: string;
    seller: User;
    buyer: User;
    messages: IMessage[];
    order: IOrder;
    readBy: string[];
}

export type ChatList = {
    _id: string;
    name: string;
    lastMessage: IMessage;
    seen: boolean;
    watched: boolean;
    selected: boolean;
    updatedAt: string;
};

export type ReadChatArgs = {
    chatId: string;
    user: User;
};

export interface IChatState {
    selectedList: SelectedChatList;
    fetchingOrderChat: GlobalOperation;
    fetchingChatList: GlobalOperation;
    list: IChat[];
    selectedChatId: string | null;
}
