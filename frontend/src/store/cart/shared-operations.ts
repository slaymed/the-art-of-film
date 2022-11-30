import { ADDING_TO_CART, CLEARING_CART, FETCHING_CART, REMOVING_FROM_CART, UPDATING_CART } from "./constants";
import { addToCart, clearCart, fetchCart, removeFromCart, updateCartShippingAddress } from "./thunks";

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
    {
        thunk: removeFromCart,
        updateKey: REMOVING_FROM_CART,
    },
];
