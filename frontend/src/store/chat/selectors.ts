import { createSelector } from "@reduxjs/toolkit";
import { User } from "../auth/types";
import { IOrder } from "../orders/types";

import { GlobalOperation, RootState } from "../types";
import { SelectedChatList } from "./enums";
import { ChatList, IMessage } from "./types";

export const buyersMapList = createSelector(
    (state: RootState) => {
        const user = state.auth.user as User;
        if (!user) return [];

        return state.chat.list
            .filter((chat) => chat.seller._id === user._id)
            .map((chat) => ({
                _id: chat._id,
                name: chat.buyer.name,
                lastMessage: chat.messages[0] || {},
                seen: chat.readBy.includes(chat.buyer._id),
                watched: chat.readBy.includes(user._id),
                selected: state.chat.selectedChatId === chat._id,
                updatedAt: chat.updatedAt,
            }));
    },
    (mapList: ChatList[]) => mapList
);

export const sellersMapList = createSelector(
    (state: RootState) => {
        const user = state.auth.user as User;
        if (!user) return [];

        return state.chat.list
            .filter((chat) => chat.buyer._id === user._id)
            .map((chat) => ({
                _id: chat._id,
                name: chat.seller.name,
                lastMessage: chat.messages[0] || {},
                seen: chat.readBy.includes(chat.seller._id),
                watched: chat.readBy.includes(user._id),
                selected: state.chat.selectedChatId === chat._id,
                updatedAt: chat.updatedAt,
            }));
    },
    (map: ChatList[]) => map
);

export const fetchingChatList = createSelector(
    (state: RootState) => state.chat.fetchingChatList,
    (fetchingChatList: GlobalOperation) => fetchingChatList
);

export const selectedChatList = createSelector(
    (state: RootState) => state.chat.selectedList,
    (selectedList: SelectedChatList) => selectedList
);

export const selectedChatId = createSelector(
    (state: RootState) => state.chat.selectedChatId,
    (selectedChatId: string | null) => selectedChatId
);

export const selectedChatMessages = createSelector(
    (state: RootState) => {
        if (!state.chat.selectedChatId) return undefined;

        const chat = state.chat.list.find((c) => c._id === state.chat.selectedChatId);
        if (!chat) return undefined;

        return chat.messages;
    },
    (messages: IMessage[] | undefined) => messages
);

export const chatSeenChecker = createSelector(
    (state: RootState) => {
        const user = state.auth.user;
        if (!user) return undefined;

        if (!state.chat.selectedChatId) return undefined;

        const chat = state.chat.list.find((c) => c._id === state.chat.selectedChatId);
        if (!chat) return undefined;

        return chat.readBy.filter((id) => id !== user._id).length > 0;
    },
    (seen: boolean | undefined) => seen
);

export const selectedChatRequireRead = createSelector(
    (state: RootState) => {
        const user = state.auth.user;
        if (!user) return undefined;

        if (!state.chat.selectedChatId) return undefined;

        const chat = state.chat.list.find((c) => c._id === state.chat.selectedChatId);
        if (!chat) return undefined;

        return !chat.readBy.includes(user._id);
    },
    (requireRead: boolean | undefined) => requireRead
);

export const selectedChatOppositeUser = createSelector(
    (state: RootState) => {
        const user = state.auth.user;
        if (!user) return undefined;

        if (!state.chat.selectedChatId) return undefined;

        const chat = state.chat.list.find((c) => c._id === state.chat.selectedChatId);
        if (!chat) return undefined;

        return chat.buyer._id === user._id ? chat.seller : chat.buyer;
    },
    (opposite: User | undefined) => opposite
);

export const selectedChatOrderObject = createSelector(
    (state: RootState) => {
        if (!state.chat.selectedChatId) return undefined;

        const chat = state.chat.list.find((c) => c._id === state.chat.selectedChatId);
        if (!chat) return undefined;

        return state.orders.list.find((order) => order.chatId === chat._id);
    },
    (order: IOrder | undefined) => order
);
