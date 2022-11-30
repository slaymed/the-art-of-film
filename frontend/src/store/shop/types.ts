import { IProduct } from "../products/types";
import { GlobalOperation } from "../types";

export type ShopQuery = Partial<{
    filter: string;
    name: string;
    director: string;
    artist: string;
    cast: string;
    origin: string;
    year: number;
    format: string;
    condition: string;
    price: string;
}>;

export type FetchingShopProductsVars = {
    query: ShopQuery;
    requestedPageNumber: number;
    itemsPerPage: number;
};

export type FetchingShopProductsResponse = {
    products: IProduct[];
    currentPage: number;
    pagesCount: number;
    totalCount: number;
};

export interface IShopState {
    products: IProduct[];
    fetchingShopProducts: GlobalOperation;
    pagesCount: number | null;
    currentPage: number;
    totalCount: number;
}
