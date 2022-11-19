import { LazyOperationInitialState, OperationInitialState } from "./../initial-state";
import { CREATE_POSTER, FETCH_MY_PRODUCTS, FETCH_PRODUCTS, UPDATE_POSTER } from "./constants";

import { IProductsState } from "./types";

export const ProductsInitialState: IProductsState = {
    [FETCH_PRODUCTS]: LazyOperationInitialState,
    [FETCH_MY_PRODUCTS]: LazyOperationInitialState,
    [CREATE_POSTER]: OperationInitialState,
    [UPDATE_POSTER]: OperationInitialState,
    remove: OperationInitialState,
    selectedProduct: null,
    fetchingSelectedProduct: OperationInitialState,
    myProducts: [],
    list: [],
};
