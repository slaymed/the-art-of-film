import { LazyOperationInitialState, OperationInitialState } from "../initial-state";
import { IAuthState } from "./types";

// SHARED OPERATIONS
import {
    FETCHING_AUTHENTICATED_USER,
    FINISH_PASSWORD_RESET,
    PASSWORD_RESET,
    REGISTER,
    SIGNIN,
    SIGNOUT,
    UPDATE_PROFILE,
} from "./constants";

export const AuthIntialState: IAuthState = {
    [SIGNIN]: OperationInitialState,
    [SIGNOUT]: OperationInitialState,
    [REGISTER]: OperationInitialState,
    [FETCHING_AUTHENTICATED_USER]: LazyOperationInitialState,
    [PASSWORD_RESET]: OperationInitialState,
    [FINISH_PASSWORD_RESET]: LazyOperationInitialState,
    [UPDATE_PROFILE]: OperationInitialState,
    user: null,
};
