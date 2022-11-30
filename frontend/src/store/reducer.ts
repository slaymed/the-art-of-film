import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/reducer";
import cartReducer from "./cart/reducer";
import chatReducer from "./chat/reducer";
import currencyReducer from "./currency/reducer";
import ordersReducer from "./orders/reducer";
import productsReducer from "./products/reducer";
import stripeReducer from "./stripe/reducer";
import uploadsReducer from "./upload/reducer";
import advertisementReducer from "./advertisements/reducer";
import paymentMethodsReducer from "./payment-methods/reducer";
import subscriptionsReducer from "./subscription/reducer";
import issuesReducer from "./issues/reducer";
import tagsReducer from "./tags/reducer";
import uiReducer from "./ui/reducer";
import showcasesReducer from "./showcase/reducer";
import withdrawRequestsReducer from "./withdraw-requests/reducer";
import giftsReducer from "./gifts/reducer";
import settingsReducer from "./settings/reducer";
import shopReducer from "./shop/reducer";
import transactionsReducer from "./transactions/reducer";

export default combineReducers({
    auth: authReducer,
    cart: cartReducer,
    currencyState: currencyReducer,
    products: productsReducer,
    advertisements: advertisementReducer,
    chat: chatReducer,
    stripe: stripeReducer,
    uploads: uploadsReducer,
    orders: ordersReducer,
    paymentMethods: paymentMethodsReducer,
    subscriptions: subscriptionsReducer,
    issues: issuesReducer,
    tags: tagsReducer,
    ui: uiReducer,
    showcases: showcasesReducer,
    withdrawRequests: withdrawRequestsReducer,
    gifts: giftsReducer,
    settings: settingsReducer,
    shop: shopReducer,
    transactions: transactionsReducer,
});
