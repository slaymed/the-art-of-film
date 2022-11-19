import store from ".";
import { RequestLifeCycle } from "./enums";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type ThunkResponseType<DATA, ERR> = {
    status: RequestLifeCycle;
    data?: DATA;
    errors?: ERR;
};

export type RealtimeResponseType<DATA> = {
    success: boolean;
    data: DATA;
};

export type GlobalMessage = {
    message?: string;
    redirect?: string;
};

export type GlobalOperation = {
    loading: boolean;
    errors: GlobalMessage;
};

export type TimeStamp = {
    createdAt: string;
    updatedAt: string;
};
