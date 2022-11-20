import {
    FETCH_SELLERS_SHOWCASE_LIST,
    FETCH_SELLERS_SHOWCASE_LIST_TARGETED_VALUE,
    FETCH_TOP_SELLERS_SHOWCASE_LIST,
    FETCH_TOP_SELLERS_SHOWCASE_LIST_TARGETED_VALUE,
} from "./constants";
import { LazyOperationInitialState } from "../initial-state";
import { IShowcaseState } from "./types";

export const ShowcaseInitialState: IShowcaseState = {
    fetchingSelectedShowCase: LazyOperationInitialState,
    selectedShowcase: null,
    selectedProduct: null,
    [FETCH_SELLERS_SHOWCASE_LIST_TARGETED_VALUE]: [],
    [FETCH_TOP_SELLERS_SHOWCASE_LIST_TARGETED_VALUE]: [],
    [FETCH_SELLERS_SHOWCASE_LIST]: LazyOperationInitialState,
    [FETCH_TOP_SELLERS_SHOWCASE_LIST]: LazyOperationInitialState,
};
