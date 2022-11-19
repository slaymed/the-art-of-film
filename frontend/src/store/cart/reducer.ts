import { createSlice } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { GlobalMessage, ThunkResponseType } from "../types";
import { CartInitialState } from "./initial-state";
import { cartSharedOperations } from "./shared-operations";
import { ICart } from "./types";

const slice = createSlice({
    name: "cart",
    initialState: CartInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        for (const { thunk, updateKey } of cartSharedOperations) {
            addCase(thunk.pending, (cart) => {
                cart[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (cart, { payload }) => {
                const { data: syncedCard } = payload;

                if (!cart.data) {
                    cart.data = syncedCard;
                    cart[updateKey].loading = false;
                    cart[updateKey].errors = globalMessage;
                    return;
                }

                for (const key of Object.keys(cart.data))
                    if (JSON.stringify(cart.data[key]) !== JSON.stringify(syncedCard[key]))
                        cart.data[key] = syncedCard[key];

                cart[updateKey].loading = false;
                cart[updateKey].errors = globalMessage;
            });
            addCase(thunk.rejected, (cart, { payload }) => {
                const { errors } = payload as ThunkResponseType<ICart, GlobalMessage>;

                if (errors) cart[updateKey].errors = errors;
                cart[updateKey].loading = false;
            });
        }
    },
});

const cartReducer = slice.reducer;

export default cartReducer;
