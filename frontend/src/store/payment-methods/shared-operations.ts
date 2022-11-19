import { ADDING_CREDIT_CARD, DEFAULTING_CREDIT_CARD, DELETING_CREDIT_CARD, FETCHING_CREDIT_CARDS } from "./constants";
import { addCreditCard, defaultACreditCard, deleteCreditCard, fetchCreditCards } from "./thunks";

export const creditCardsSharedOperations = [
    {
        thunk: fetchCreditCards,
        updateKey: FETCHING_CREDIT_CARDS,
    },
    {
        thunk: defaultACreditCard,
        updateKey: DEFAULTING_CREDIT_CARD,
    },
    {
        thunk: addCreditCard,
        updateKey: ADDING_CREDIT_CARD,
    },
    {
        thunk: deleteCreditCard,
        updateKey: DELETING_CREDIT_CARD,
    },
];
