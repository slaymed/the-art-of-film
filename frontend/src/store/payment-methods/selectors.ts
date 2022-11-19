import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";
import { CreditCardOperation, ICreditCard } from "./types";

export const fetchingCreditCards = createSelector(
    (state: RootState) => state.paymentMethods.fetchingCreditCards,
    (fetchingCreditCards: CreditCardOperation) => fetchingCreditCards
);

export const creditCardsSelector = createSelector(
    (state: RootState) => state.paymentMethods.creditCards,
    (creditCards: ICreditCard[]) => creditCards
);

export const defaultingCreditCard = createSelector(
    (state: RootState) => state.paymentMethods.defaultingCreditCard,
    (defaultingCreditCard: CreditCardOperation) => defaultingCreditCard
);

export const addingCreditCard = createSelector(
    (state: RootState) => state.paymentMethods.addingCreditCard,
    (addingCreditCard: CreditCardOperation) => addingCreditCard
);

export const deletingCreditCard = createSelector(
    (state: RootState) => state.paymentMethods.deletingCreditCard,
    (deletingCreditCard: CreditCardOperation) => deletingCreditCard
);

export const selectCreditCardById = (id: string | undefined) =>
    createSelector(
        (state: RootState) => state.paymentMethods.creditCards.find((c) => c.id === id),
        (creditCard: ICreditCard | undefined) => creditCard
    );
