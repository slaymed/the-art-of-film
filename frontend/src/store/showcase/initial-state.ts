import { LazyOperationInitialState } from "../initial-state";
import { IShowcaseState } from "./types";

export const ShowcaseInitialState: IShowcaseState = {
    fetchingSelectedShowCase: LazyOperationInitialState,
    selectedShowcase: null,
    selectedProduct: null,
};
