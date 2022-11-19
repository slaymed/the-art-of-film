import { ADDING_CREDIT_CARD, DEFAULTING_CREDIT_CARD, DELETING_CREDIT_CARD, FETCHING_CREDIT_CARDS } from "./constants";
import { CreditCardErrors, CreditCardOperation, IPaymentMethodsState } from "./types";

export const creditCardErrorsInitialState: CreditCardErrors = {
    message: "",
};

export const creditCardLazyOperationInitialState: CreditCardOperation = {
    loading: true,
    errors: creditCardErrorsInitialState,
};

export const creditCardOperationInitialState: CreditCardOperation = {
    loading: false,
    errors: creditCardErrorsInitialState,
};

export const PaymentMethodsInitialState: IPaymentMethodsState = {
    bankAccounts: [],
    creditCards: [],
    fetchingBankAccounts: creditCardLazyOperationInitialState,
    [FETCHING_CREDIT_CARDS]: creditCardLazyOperationInitialState,
    [DEFAULTING_CREDIT_CARD]: creditCardOperationInitialState,
    [ADDING_CREDIT_CARD]: creditCardOperationInitialState,
    [DELETING_CREDIT_CARD]: creditCardOperationInitialState,
};
