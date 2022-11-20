import {
    FETCH_SELLERS_SHOWCASE_LIST,
    FETCH_SELLERS_SHOWCASE_LIST_TARGETED_VALUE,
    FETCH_TOP_SELLERS_SHOWCASE_LIST,
    FETCH_TOP_SELLERS_SHOWCASE_LIST_TARGETED_VALUE,
} from "./constants";
import { fetchSellersShowcaseList, fetchTopSellersShowcaseList } from "./thunks";

export const fetchingSellersShowcaseListSharedOperations = [
    {
        thunk: fetchSellersShowcaseList,
        updateKey: FETCH_SELLERS_SHOWCASE_LIST,
        targetedValue: FETCH_SELLERS_SHOWCASE_LIST_TARGETED_VALUE,
    },
    {
        thunk: fetchTopSellersShowcaseList,
        updateKey: FETCH_TOP_SELLERS_SHOWCASE_LIST,
        targetedValue: FETCH_TOP_SELLERS_SHOWCASE_LIST_TARGETED_VALUE,
    },
];
