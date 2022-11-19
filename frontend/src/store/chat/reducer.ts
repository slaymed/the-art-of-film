import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { indexFound } from "../../helpers/index-found";

import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { SelectedChatList } from "./enums";
import { ChatInitialStat } from "./initial-state";
import { fetchChatListObject, fetchOrderChat, readChat, sendMessage } from "./thnuks";
import { IChat, IMessage } from "./types";

const slice = createSlice({
    name: "chat",
    initialState: ChatInitialStat,
    reducers: {
        messageRecieved_RT(chat, { payload: message }: PayloadAction<IMessage>) {
            const chatIndex = chat.list.findIndex((c) => c._id === message.chatId);
            if (!indexFound(chatIndex)) return;

            const targetedChat = chat.list[chatIndex];

            targetedChat.readBy = [message.from];
            targetedChat.messages.unshift(message);
        },
        chatCreated_RT(chat, { payload: createdChat }: PayloadAction<IChat>) {
            const chatIndex = chat.list.findIndex((c) => c._id === createdChat._id);

            if (indexFound(chatIndex)) {
                chat.list[chatIndex] = createdChat;
                return;
            }

            chat.list.unshift(createdChat);
        },
        chatRemoved_RT(chat, { payload: chatId }: PayloadAction<string>) {
            const chatIndex = chat.list.findIndex((c) => c._id === chatId);
            if (!indexFound(chatIndex)) return;

            chat.list.splice(chatIndex, 1);
        },
        chatSeen_RT(chat, { payload: { _id, readBy } }: PayloadAction<IChat>) {
            const chatIndex = chat.list.findIndex((c) => c._id === _id);
            if (!indexFound(chatIndex)) return;

            chat.list[chatIndex].readBy = readBy;
        },
        selectedChatListUpdated(chat, { payload }: PayloadAction<SelectedChatList>) {
            chat.selectedList = payload;
        },
        chatIdUpdated(chat, { payload: chatId }: PayloadAction<string | null>) {
            if (!chatId) {
                chat.selectedChatId = null;
                return;
            }

            if (chat.selectedChatId === chatId) {
                chat.selectedChatId = null;
                return;
            }

            chat.selectedChatId = chatId;
        },
    },
    extraReducers({ addCase }) {
        addCase(fetchChatListObject.pending, (chat) => {
            chat.fetchingChatList.loading = true;
        });
        addCase(fetchChatListObject.fulfilled, (chat, { payload }) => {
            const { data: list } = payload;

            if (chat.list.length > 0) {
                for (const syncedChat of list) {
                    const chatIndex = chat.list.findIndex((c) => c._id === syncedChat._id);

                    if (indexFound(chatIndex)) {
                        chat.list[chatIndex] = syncedChat;
                        continue;
                    }

                    chat.list.unshift(syncedChat);
                }

                chat.fetchingChatList.errors = globalMessage;
                chat.fetchingChatList.loading = false;
                return;
            }

            chat.list = list;
            chat.fetchingChatList.errors = globalMessage;
            chat.fetchingChatList.loading = false;
        });
        addCase(fetchChatListObject.rejected, (chat, { payload }) => {
            const { errors } = payload as ThunkResponseType<Map<string, IChat>, GlobalMessage>;

            if (errors) chat.fetchingChatList.errors = errors;
            chat.fetchingChatList.loading = false;
        });

        addCase(fetchOrderChat.pending, (chat) => {
            chat.fetchingChatList.loading = true;
        });
        addCase(fetchOrderChat.fulfilled, (chat, { payload }) => {
            const { data: fetchedChat } = payload;

            const chatIndex = chat.list.findIndex((c) => c._id === fetchedChat._id);

            if (indexFound(chatIndex)) chat.list[chatIndex] = fetchedChat;
            if (!indexFound(chatIndex)) chat.list.unshift(fetchedChat);

            chat.fetchingOrderChat.errors = globalMessage;
            chat.fetchingOrderChat.loading = false;
        });
        addCase(fetchOrderChat.rejected, (chat, { payload }) => {
            const { errors } = payload as ThunkResponseType<IChat, GlobalMessage>;

            if (errors) chat.fetchingOrderChat.errors = errors;
            chat.fetchingOrderChat.loading = false;
        });

        addCase(sendMessage.pending, (chat, { meta: { arg } }) => {
            const { chatId, body, _id, from } = arg;

            if (chat.selectedChatId !== chatId) return;

            const localMessage: IMessage = {
                _id,
                body,
                from,
                chatId,
                sending: true,
                failed: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const chatIndex = chat.list.findIndex((c) => c._id === chatId);
            if (!indexFound(chatIndex)) return;

            chat.list[chatIndex].messages.unshift(localMessage);
            chat.list[chatIndex].readBy = [from];
        });
        addCase(sendMessage.fulfilled, (chat, { payload, meta: { arg } }) => {
            const { chatId, _id } = arg;
            const { data: message } = payload;

            const chatIndex = chat.list.findIndex((c) => c._id === chatId);
            if (!indexFound(chatIndex)) return;

            const targetedChat = chat.list[chatIndex];

            const messageIndex = targetedChat.messages.findIndex((m) => m._id === _id);
            if (!indexFound(messageIndex)) return;

            targetedChat.messages[messageIndex] = message;
        });
        addCase(sendMessage.rejected, (chat, { payload, meta: { arg } }) => {
            const { chatId, _id } = arg;
            const { errors } = payload as ThunkResponseType<IMessage, GlobalMessage>;

            const chatIndex = chat.list.findIndex((c) => c._id === chatId);
            if (!indexFound(chatIndex)) return;

            const targetedChat = chat.list[chatIndex];

            const messageIndex = targetedChat.messages.findIndex((m) => m._id === _id);
            if (!indexFound(messageIndex)) return;

            if (errors) targetedChat.messages[messageIndex].failed = true;
        });

        addCase(readChat.pending, (chat, { meta: { arg } }) => {
            const { chatId, user } = arg;

            const chatIndex = chat.list.findIndex((c) => c._id === chatId);
            if (!indexFound(chatIndex)) return;

            const targetedChat = chat.list[chatIndex];

            if (!targetedChat.readBy.includes(user._id)) targetedChat.readBy.push(user._id);
        });
        addCase(readChat.fulfilled, (chat, { payload, meta: { arg } }) => {
            const { chatId } = arg;
            const { data: readBy } = payload;

            const chatIndex = chat.list.findIndex((c) => c._id === chatId);
            if (!indexFound(chatIndex)) return;

            const targetedChat = chat.list[chatIndex];

            targetedChat.readBy = readBy;
        });
        addCase(readChat.rejected, () => {});
    },
});

const chatReducer = slice.reducer;

export const {
    messageRecieved_RT,
    selectedChatListUpdated,
    chatIdUpdated,
    chatCreated_RT,
    chatSeen_RT,
    chatRemoved_RT,
} = slice.actions;

export default chatReducer;
