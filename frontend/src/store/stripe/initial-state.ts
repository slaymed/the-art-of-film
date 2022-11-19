import { OperationInitialState } from "../initial-state";
import { CANCEL_SESSION, CREATE_SESSION } from "./constants";
import { IStripeState } from "./types";

export const StripeInitialState: IStripeState = {
    [CANCEL_SESSION]: OperationInitialState,
    [CREATE_SESSION]: OperationInitialState,
    currentSession: null,
};
