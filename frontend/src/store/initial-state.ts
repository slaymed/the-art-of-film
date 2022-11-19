import { GlobalMessage, GlobalOperation } from "./types";

export const globalMessage: GlobalMessage = { message: "" };

export const OperationInitialState: GlobalOperation = {
    loading: false,
    errors: globalMessage,
};

export const LazyOperationInitialState: GlobalOperation = {
    loading: true,
    errors: globalMessage,
};
