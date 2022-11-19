import { CANCEL_SESSION, CREATE_SESSION } from "./constants";
import { createAdvertiseSession, cancelSession, createOrderSession } from "./thunks";

export const stripeSharedOperation = [
    {
        thunk: createAdvertiseSession,
        updateKey: CREATE_SESSION,
    },
    {
        thunk: createOrderSession,
        updateKey: CREATE_SESSION,
    },
    {
        thunk: cancelSession,
        updateKey: CANCEL_SESSION,
    },
];
