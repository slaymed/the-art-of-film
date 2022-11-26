import { CREATE_ADVERTISE, SYNC_ADVERTISE, UPDATE_ADVERTISE } from "./constants";
import { createAdvertise, syncAdvertise, updateAdvertise } from "./thunk";

export const advertiseSharedOperations = [
    {
        thunk: createAdvertise,
        updateKey: CREATE_ADVERTISE,
    },
    {
        thunk: updateAdvertise,
        updateKey: UPDATE_ADVERTISE,
    },
    {
        thunk: syncAdvertise,
        updateKey: SYNC_ADVERTISE,
    },
];
