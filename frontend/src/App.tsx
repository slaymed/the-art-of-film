import React, { useEffect, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useDispatch } from "./hooks/useDispatch";

import { loadUserRelated } from "./helpers/load-user-related";

import { GlobalMessage, ThunkResponseType } from "./store/types";
import { User } from "./store/auth/types";
import { RequestLifeCycle } from "./store/enums";
import { fetchAuthenticatedUser } from "./store/auth/thunks";
import { fetchAvailableSubscriptions } from "./store/subscription/thunks";
import { fetchRates } from "./store/currency/thunks";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthRoute from "./components/routes/AuthRoute";

import AboutScreen from "./screens/AboutScreen";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import AdvertiseListScreen from "./screens/AdvertiseListScreen";
import AdvertiseScreen from "./screens/AdvertiseScreen";
import SessionHandleScreen from "./screens/SessionHandleScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ChatScreen from "./screens/ChatScreen";
import RegisterSharedRealtimeEventsCard from "./components/cards/RegisterSharedRealtimeEventsCard";
import OrdersScreen from "./screens/OrdersScreen";
import AdvertiseWithUs from "./screens/AdvertiseWithUs";
import BlogScreen from "./screens/BlogScreen";
import ContactScreen from "./screens/ContactScreen";
import FAQScreen from "./screens/FAQScreen";
import GrahamHumpreys from "./screens/GrahamHumpreys";
import MapScreen from "./screens/MapScreen";
import PaymentSuccess from "./screens/PaymentSuccess";
import PaymentCanceledScreen from "./screens/PaymentCanceledScreen";
import PosterGradingCategoriesScreen from "./screens/PosterGradingCategoriesScreen";
import PricingScreen from "./screens/PricingScreen";
import PaymentMethodsScreen from "./screens/PaymentMethodsScreen";
import CreditCardsScreen from "./screens/CreditCardsScreen";
import AddCreditCardScreen from "./screens/AddCreditCardScreen";
import CreditCardScreen from "./screens/CreditCardScreen";
import SubscribeScreen from "./screens/SubscribeScreen";
import CurrentSubscriptionScreen from "./screens/CurrentSubscriptionScreen";
import RaiseIssueScreen from "./screens/RaiseIssueScreen";
import IssuesScreen from "./screens/IssuesScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CreatePosterScreen from "./screens/CreatePosterScreen";
import EditPosterScreen from "./screens/EditPosterScreen";
import PostersListScreen from "./screens/PostersListScreen";
import PosterScreen from "./screens/PosterScreen";
import SellerShowcaseScreen from "./screens/SellerShowcaseScreen";
import SellersShowcasesListScreen from "./screens/SellersShowcasesListScreen";
import ShippingDetailScreen from "./screens/ShippingDetailScreen";

dayjs.extend(relativeTime);

export const socket = io({ host: "/" }).connect();

function App() {
    const dispatch = useDispatch();

    const load = useCallback(async () => {
        dispatch(fetchRates());
        dispatch(fetchAvailableSubscriptions());

        const res = await dispatch(fetchAuthenticatedUser());
        const { status } = res.payload as ThunkResponseType<User, GlobalMessage>;
        if (status !== RequestLifeCycle.SUCCESS) return;

        loadUserRelated(dispatch);
    }, [dispatch]);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <BrowserRouter>
            <div>
                <Header />
                <SessionHandleScreen />
                <RegisterSharedRealtimeEventsCard />
                <main>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/advertisments" element={<AdvertiseListScreen />}></Route>
                        <Route path="/advertise" element={<AdvertiseScreen />}></Route>
                        <Route path="/advertise-with-us" element={<AdvertiseWithUs />}></Route>
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/signin" element={<SigninScreen />} />
                        <Route
                            path="/cart"
                            element={
                                <AuthRoute>
                                    <CartScreen />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/shipping"
                            element={
                                <AuthRoute>
                                    <ShippingAddressScreen />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/placeorder"
                            element={
                                <AuthRoute>
                                    <PlaceOrderScreen />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <AuthRoute>
                                    <OrdersScreen />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/order/:orderId"
                            element={
                                <AuthRoute>
                                    <OrderScreen />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/raise-an-issue/:orderId"
                            element={
                                <AuthRoute>
                                    <RaiseIssueScreen />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/issues/:orderId"
                            element={
                                <AuthRoute>
                                    <IssuesScreen />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/chat"
                            element={
                                <AuthRoute>
                                    <ChatScreen />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/map"
                            element={
                                <AuthRoute>
                                    <MapScreen />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/payment-methods"
                            element={
                                <AuthRoute>
                                    <PaymentMethodsScreen />
                                </AuthRoute>
                            }
                        />

                        <Route
                            path="/payment-methods/credit-cards"
                            element={
                                <AuthRoute>
                                    <CreditCardsScreen />
                                </AuthRoute>
                            }
                        />

                        <Route
                            path="/payment-methods/credit-cards/:creditCardId"
                            element={
                                <AuthRoute>
                                    <CreditCardScreen />
                                </AuthRoute>
                            }
                        />

                        <Route
                            path="/payment-methods/credit-cards/add"
                            element={
                                <AuthRoute>
                                    <AddCreditCardScreen />
                                </AuthRoute>
                            }
                        />

                        <Route
                            path="/my-subscription"
                            element={
                                <AuthRoute>
                                    <CurrentSubscriptionScreen />
                                </AuthRoute>
                            }
                        />

                        <Route
                            path="/subscribe/:subscriptionId"
                            element={
                                <AuthRoute>
                                    <SubscribeScreen />
                                </AuthRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <AuthRoute>
                                    <ProfileScreen />
                                </AuthRoute>
                            }
                        />

                        <Route
                            path="/posters/create"
                            element={
                                <AuthRoute>
                                    <CreatePosterScreen />
                                </AuthRoute>
                            }
                        />

                        <Route
                            path="/posters/:posterId/edit"
                            element={
                                <AuthRoute>
                                    <EditPosterScreen />
                                </AuthRoute>
                            }
                        />

                        <Route
                            path="/shipment-settings"
                            element={
                                <AuthRoute>
                                    <ShippingDetailScreen />
                                </AuthRoute>
                            }
                        />

                        <Route
                            path="/posters/seller"
                            element={
                                <AuthRoute>
                                    <PostersListScreen />
                                </AuthRoute>
                            }
                        />

                        <Route path="/poster/:posterId" element={<PosterScreen />} />

                        <Route path="/seller/:sellerId" element={<SellerShowcaseScreen />} />
                        <Route path="/sellers" element={<SellersShowcasesListScreen />} />
                        <Route path="/page/subscriptions" element={<PricingScreen />} />

                        <Route path="/payment/success" element={<PaymentSuccess />} />
                        <Route path="/payment/canceled" element={<PaymentCanceledScreen />} />
                        <Route path="/poster-grading-categories" element={<PosterGradingCategoriesScreen />} />
                        <Route path="/grahamhumpreys" element={<GrahamHumpreys />} />
                        <Route path="/about-us" element={<AboutScreen />} />
                        <Route path="/privacy" element={<PrivacyScreen />} />
                        <Route path="/blog-page" element={<BlogScreen />} />
                        <Route path="/contact" element={<ContactScreen />} />
                        <Route path="/faq" element={<FAQScreen />} />
                        <Route path="/reset/:token" element={<ResetPasswordScreen />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
