import { createSlice } from "@reduxjs/toolkit";

import { globalMessage } from "../initial-state";
import { ThunkResponseType } from "../types";
import { PaymentMethodsInitialState } from "./initial-state";
import { creditCardsSharedOperations } from "./shared-operations";
import { CreditCardErrors, ICreditCard } from "./types";

const slice = createSlice({
    name: "paymentMethods",
    initialState: PaymentMethodsInitialState,
    reducers: {},
    extraReducers({ addCase }) {
        for (const { thunk, updateKey } of creditCardsSharedOperations) {
            addCase(thunk.pending, (paymentMethods) => {
                paymentMethods[updateKey].loading = true;
            });
            addCase(thunk.fulfilled, (paymentMethods, { payload }) => {
                const { data: creditCards } = payload;

                creditCards.sort((a, b) => {
                    const a_c = a.default ? 1 : -1;
                    const a_b = b.default ? 1 : -1;

                    return a_b - a_c;
                });

                paymentMethods.creditCards = creditCards;
                paymentMethods[updateKey].errors = globalMessage;
                paymentMethods[updateKey].loading = false;
            });
            addCase(thunk.rejected, (paymentMethods, { payload }) => {
                const { errors } = payload as ThunkResponseType<ICreditCard[], CreditCardErrors>;

                if (errors) paymentMethods[updateKey].errors = errors;
                paymentMethods[updateKey].loading = false;
            });
        }
    },
});

const paymentMethodsReducer = slice.reducer;

export default paymentMethodsReducer;
