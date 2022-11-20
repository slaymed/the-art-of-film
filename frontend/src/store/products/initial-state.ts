import { LazyOperationInitialState, OperationInitialState } from "./../initial-state";
import {
    CREATE_POSTER,
    FETCH_MY_PRODUCTS,
    FETCH_MY_PRODUCTS_TARGETED_VALUE,
    FETCH_HOME_PRODUCTS,
    FETCH_HOME_PRODUCTS_TARGETED_VALUE,
    UPDATE_POSTER,
} from "./constants";

import { IProductsState } from "./types";

export const ProductsInitialState: IProductsState = {
    [FETCH_HOME_PRODUCTS]: LazyOperationInitialState,
    [FETCH_MY_PRODUCTS]: LazyOperationInitialState,
    [CREATE_POSTER]: OperationInitialState,
    [UPDATE_POSTER]: OperationInitialState,
    [FETCH_HOME_PRODUCTS_TARGETED_VALUE]: [],
    [FETCH_MY_PRODUCTS_TARGETED_VALUE]: [],
    remove: OperationInitialState,
    selectedProduct: null,
    fetchingSelectedProduct: OperationInitialState,
};
