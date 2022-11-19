import { Dispatch } from "@reduxjs/toolkit";

import {
    chatIdUpdated,
    chatCreated_RT,
    chatSeen_RT,
    messageRecieved_RT,
    selectedChatListUpdated,
    chatRemoved_RT,
} from "./reducer";
import { IChat, IMessage } from "./types";
import { SelectedChatList } from "./enums";

export function selectChatList(payload: SelectedChatList) {
    return function (dispatch: Dispatch) {
        dispatch({ type: selectedChatListUpdated.type, payload });
    };
}

export function updateChatId(payload: string | null) {
    return function (dispatch: Dispatch) {
        dispatch({ type: chatIdUpdated.type, payload });
    };
}

export function fireChatCreated_RT(payload: IChat) {
    return function (dispatch: Dispatch) {
        dispatch({ type: chatCreated_RT.type, payload });
    };
}

export function fireChatRemoved_RT(payload: string) {
    return function (dispatch: Dispatch) {
        dispatch({ type: chatRemoved_RT.type, payload });
    };
}

export function fireChatSeen_RT(payload: IChat) {
    return function (dispatch: Dispatch) {
        dispatch({ type: chatSeen_RT.type, payload });
    };
}

export function fireMessageRecieved_RT(payload: IMessage) {
    return function (dispatch: Dispatch) {
        dispatch({ type: messageRecieved_RT.type, payload });
    };
}
