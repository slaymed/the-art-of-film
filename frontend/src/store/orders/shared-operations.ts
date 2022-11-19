import { CREATE_ORDER, CHANGING_ORDER_STATUS, SYNC_ORDER, DELETE_ORDER } from "./constants";
import { createOrder, deleteOrder, markOrderAsDelivered, markOrderAsRecieved, syncOrder } from "./thunks";

export const ordersSharedOperations = [
    {
        thunk: createOrder,
        updateKey: CREATE_ORDER,
    },
    {
        thunk: deleteOrder,
        updateKey: DELETE_ORDER,
    },
    {
        thunk: syncOrder,
        updateKey: SYNC_ORDER,
    },
    {
        thunk: markOrderAsDelivered,
        updateKey: CHANGING_ORDER_STATUS,
    },
    {
        thunk: markOrderAsRecieved,
        updateKey: CHANGING_ORDER_STATUS,
    },
];
