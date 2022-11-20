import {
    CREATE_POSTER,
    FETCH_MY_PRODUCTS,
    FETCH_MY_PRODUCTS_TARGETED_VALUE,
    FETCH_HOME_PRODUCTS,
    FETCH_HOME_PRODUCTS_TARGETED_VALUE,
    UPDATE_POSTER,
} from "./constants";
import { createPoster, fetchMyProducts, fetchHomeProducts, updatePoster } from "./thunks";

export const fetchingProductsSharedOperations = [
    { thunk: fetchHomeProducts, updateKey: FETCH_HOME_PRODUCTS, targetedValue: FETCH_HOME_PRODUCTS_TARGETED_VALUE },
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
