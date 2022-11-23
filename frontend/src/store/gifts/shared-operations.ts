import { BUYING_GIFT, SYNCING_GIFT } from "./constants";
import { buyGiftSub, syncGift } from "./thunks";

export const giftsSharedOperation = [
    { thunk: buyGiftSub, updateKey: BUYING_GIFT },
    { thunk: syncGift, updateKey: SYNCING_GIFT },
];
