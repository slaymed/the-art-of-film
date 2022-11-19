import {
    CREATE_POSTER,
    FETCH_MY_PRODUCTS,
    FETCH_MY_PRODUCTS_TARGETED_VALUE,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_TARGETED_VALUE,
    UPDATE_POSTER,
} from "./constants";
import { createPoster, fetchMyProducts, fetchProducts, updatePoster } from "./thunks";

export const fetchingProductsSharedOperations = [
    { thunk: fetchProducts, updateKey: FETCH_PRODUCTS, targetedValue: FETCH_PRODUCTS_TARGETED_VALUE },
    { thunk: fetchMyProducts, updateKey: FETCH_MY_PRODUCTS, targetedValue: FETCH_MY_PRODUCTS_TARGETED_VALUE },
];

export const create_edit_product_shared_operation = [
    {
        thunk: createPoster,
        updateKey: CREATE_POSTER,
    },
    {
        thunk: updatePoster,
        updateKey: UPDATE_POSTER,
    },
];