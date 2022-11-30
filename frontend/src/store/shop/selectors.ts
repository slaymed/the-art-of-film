import { createSelector } from "@reduxjs/toolkit";

import { IProduct } from "../products/types";
import { GlobalOperation, RootState } from "../types";

export const shopProducts = createSelector(
    (state: RootState) => state.shop.products,
    (products: IProduct[]) => products
);

export const shopPagesCount = createSelector(
    (state: RootState) => state.shop.pagesCount,
    (pagesCount: number | null) => pagesCount
);

export const shopTotalCount = createSelector(
    (state: RootState) => state.shop.totalCount,
    (totalCount: number) => totalCount
);

export const shopCurrentPage = createSelector(
    (state: RootState) => state.shop.currentPage,
    (currentPage: number) => currentPage
);

export const fetchingShopProducts = createSelector(
    (state: RootState) => state.shop.fetchingShopProducts,
    (fetchingShopProducts: GlobalOperation) => fetchingShopProducts
);
