import { FETCH_CURRENT_SUB, SUBSCRIBE } from "./constants";
import { fetchCurrentSubscription, subscribe } from "./thunks";

export const subscriptionSharedOperations = [
    { thunk: subscribe, updateKey: SUBSCRIBE },
    { thunk: fetchCurrentSubscription, updateKey: FETCH_CURRENT_SUB },
];
