import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IChat, IMessage, ReadChatArgs } from "./types";
import { RequestLifeCycle } from "../enums";
import { mapErrors } from "../../helpers/map-errors";
import {
    FETCH_CHAT_LIST_PREFIX,
    FETCH_CHAT_LIST_URL,
    FETCH_ORDER_CHAT_PREFIX,
    FETCH_ORDER_CHAT_URL,
    READ_CHAT_PREFIX,
    READ_CHAT_URL,
    SEND_MESSAGE_PREFIX,
    SEND_MESSAGE_URL,
} from "./constants";

export const fetchChatListObject = createAsyncThunk(FETCH_CHAT_LIST_PREFIX, async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(FETCH_CHAT_LIST_URL);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as IChat[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const sendMessage = createAsyncThunk(
    SEND_MESSAGE_PREFIX,
    async (message: Pick<IMessage, "_id" | "body" | "chatId" | "from">, { rejectWithValue }) => {
        const { _id, body, chatId, from } = message || {};
        if (!_id || !body || !chatId || !from)
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: { message: "Missing Params" } });

        try {
            const res = await axios.post(SEND_MESSAGE_URL + message.chatId, message);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as IMessage };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);

export const readChat = createAsyncThunk(READ_CHAT_PREFIX, async (args: ReadChatArgs, { rejectWithValue }) => {
    try {
        const res = await axios.get(READ_CHAT_URL + args.chatId);
        return { status: RequestLifeCycle.SUCCESS, data: res.data as string[] };
    } catch (errors) {
        return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
    }
});

export const fetchOrderChat = createAsyncThunk(
    FETCH_ORDER_CHAT_PREFIX,
    async (orderId: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(FETCH_ORDER_CHAT_URL + orderId);
            return { status: RequestLifeCycle.SUCCESS, data: res.data as IChat };
        } catch (errors) {
            return rejectWithValue({ status: RequestLifeCycle.FAILED, errors: mapErrors(errors) });
        }
    }
);
