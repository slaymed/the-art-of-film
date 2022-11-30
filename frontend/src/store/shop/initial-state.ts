import { OperationInitialState } from "../initial-state";
import { IShopState } from "./types";

export const ShopInitialState: IShopState = {
    currentPage: 1,
    fetchingShopProducts: OperationInitialState,
    pagesCount: null,
    products: [],
    totalCount: 0,
};
