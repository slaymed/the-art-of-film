import { ADDING_TO_CART, CLEARING_CART, FETCHING_CART, UPDATING_CART } from "./constants";
import { addToCart, clearCart, fetchCart, updateCartShippingAddress } from "./thunks";

export const cartSharedOperations = [
    {
        thunk: addToCart,
        updateKey: ADDING_TO_CART,
    },
    {
        thunk: fetchCart,
        updateKey: FETCHING_CART,
    },
    {
        thunk: clearCart,
        updateKey: CLEARING_CART,
    },
    {
        thunk: updateCartShippingAddress,
        updateKey: UPDATING_CART,
    },
];
