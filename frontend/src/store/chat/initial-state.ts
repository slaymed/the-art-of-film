import { SelectedChatList } from "./enums";
import { OperationInitialState } from "../initial-state";
import { IChatState } from "./types";

export const ChatInitialStat: IChatState = {
    selectedList: SelectedChatList.BUYERS,
    fetchingChatList: OperationInitialState,
    fetchingOrderChat: OperationInitialState,
    list: [],
    selectedChatId: null,
};
