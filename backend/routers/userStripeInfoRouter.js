import express from "express";
import expressAsyncHandler from "express-async-handler";

import getStripe from "../helpers/get-stripe.js";
import hasErrors from "../helpers/has-errors.js";
import UserStripeInfo from "../models/userStripeInfoModal.js";
import { isAuth } from "../utils.js";

const userStripeInfoRouter = express.Router();

userStripeInfoRouter.get(
    "/",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const userStripeInfo = await UserStripeInfo.findOne({ user: req.user._id });
            if (!userStripeInfo)
                return res
                    .status(500)
                    .json({ message: "Can't show your stripe info at the moment, please try again later." });

            const stripe = await getStripe();

            const customer = await stripe.customers.retrieve(userStripeInfo.customer);

            return res.status(200).json({ customer });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

userStripeInfoRouter.post(
    "/make-card-default",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const { pm_id } = req.body;

            const userStripeInfo = await UserStripeInfo.findOne({ user: req.user._id });
            if (!userStripeInfo)
                return res
                    .status(500)
                    .json({ message: "Can't default your credit card at the moment, please try again later." });

            const stripe = await getStripe();

            const customer = await stripe.customers.retrieve(userStripeInfo.customer);

            if (customer.invoice_settings.default_payment_method === pm_id)
                return res.status(401).json({ message: "Already a default card" });

            const paymentMethods = await stripe.customers.listPaymentMethods(userStripeInfo.customer, { type: "card" });
            const found = paymentMethods.data.find((pm) => pm.id === pm_id);
            if (!found) return res.status(401).json({ message: "Unauthorized" });

            const synced_customer = await stripe.customers.update(userStripeInfo.customer, {
                invoice_settings: {
                    default_payment_method: pm_id,
                },
            });

            const syncedPaymentMethods = await stripe.customers.listPaymentMethods(synced_customer.id, {
                type: "card",
            });

            const creditCards = syncedPaymentMethods.data.map((pm) => ({
                last4: pm.card.last4,
                exp_month: pm.card.exp_month,
                exp_year: pm.card.exp_year,
                cvc: "Secured",
                billing_details: pm.billing_details,
                id: pm.id,
                default: pm.id === synced_customer.invoice_settings.default_payment_method,
                brand: pm.card.brand,
            }));

            return res.status(200).json(creditCards);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

userStripeInfoRouter.get(
    "/my-own-credit-cards",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const userStripeInfo = await UserStripeInfo.findOne({ user: req.user._id });
            if (!userStripeInfo)
                return res
                    .status(500)
                    .json({ message: "Can't show your credit cards at the moment, please try again later." });

            const stripe = await getStripe();

            const customer = await stripe.customers.retrieve(userStripeInfo.customer);

            const paymentMethods = await stripe.customers.listPaymentMethods(userStripeInfo.customer, { type: "card" });

            const creditCards = paymentMethods.data.map((pm) => ({
                last4: pm.card.last4,
                exp_month: pm.card.exp_month,
                exp_year: pm.card.exp_year,
                cvc: "Secured",
                billing_details: pm.billing_details,
                id: pm.id,
                default: pm.id === customer.invoice_settings.default_payment_method,
                brand: pm.card.brand,
            }));

            return res.status(200).json(creditCards);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

userStripeInfoRouter.post(
    "/credit-card/delete",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const { pm_id } = req.body;

            const userStripeInfo = await UserStripeInfo.findOne({ user: req.user._id });
            if (!userStripeInfo)
                return res
                    .status(500)
                    .json({ message: "Can't delete your credit card at the moment, please try again later." });

            const stripe = await getStripe();

            const paymentMethods = await stripe.customers.listPaymentMethods(userStripeInfo.customer, { type: "card" });
            const found = paymentMethods.data.find((pm) => pm.id === pm_id);
            if (!found) return res.status(401).json({ message: "Unauthorized" });

            await stripe.paymentMethods.detach(pm_id);

            const customer = await stripe.customers.retrieve(userStripeInfo.customer);

            const syncedPaymentMethods = await stripe.customers.listPaymentMethods(userStripeInfo.customer, {
                type: "card",
            });

            const creditCards = syncedPaymentMethods.data.map((pm) => ({
                last4: pm.card.last4,
                exp_month: pm.card.exp_month,
                exp_year: pm.card.exp_year,
                cvc: "Secured",
                billing_details: pm.billing_details,
                id: pm.id,
                default: pm.id === customer.invoice_settings.default_payment_method,
                brand: pm.card.brand,
            }));

            return res.status(200).json(creditCards);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error?.raw?.message || "Something went wrong" });
        }
    })
);

userStripeInfoRouter.post(
    "/add-credit-card",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            let {
                number,
                exp_month,
                exp_year,
                cvc,
                address,
                name,
                useMyAccountName = false,
                useMyAccountAddress = true,
                phone,
            } = req.body;

            const errors = {};

            if (typeof number !== "number" || number.toString().length < 16)
                errors.number = "Must be a valid card number";
            if (typeof exp_month !== "number" || exp_month.toString().length < 1)
                errors.exp_month = "Must be a valid month date";
            if (typeof exp_year !== "number" || exp_year.toString().length < 4)
                errors.exp_year = "Must be a valid year date";
            if (typeof cvc !== "string" || cvc.length < 3) errors.cvc = "Must be a valid cvc";
            if (!useMyAccountName && (typeof name !== "string" || !name.trim()))
                errors.name = "Must not be empty or enable to use account name";
            if (typeof phone !== "string" || !phone.trim()) errors.phone = "Must not be empty";

            if (!useMyAccountAddress) {
                for (const field of ["city", "country", "line1", "postal_code", "state"])
                    if (typeof address[field] !== "string" || !address[field].trim()) {
                        if (!errors.address) errors.address = {};
                        errors.address[field] = "Must not be empty";
                    }
            }

            if (useMyAccountAddress) {
                address = {};
                if (req.user.address) address.line1 = req.user.address;
                if (req.user.city) address.city = req.user.city;
                if (req.user.code) address.country = req.user.code;
                if (req.user.postalCode) address.postal_code = req.user.postalCode;
                if (Object.keys(address).length === 0) address = undefined;
            }

            if (hasErrors(errors)) return res.status(401).json(errors);

            const userStripeInfo = await UserStripeInfo.findOne({ user: req.user._id });
            if (!userStripeInfo)
                return res
                    .status(500)
                    .json({ message: "Can't add credit card at the moment, please try again later." });

            const stripe = await getStripe();

            const customer = await stripe.customers.retrieve(userStripeInfo.customer);

            const paymentMethod = await stripe.paymentMethods.create({
                type: "card",
                card: {
                    number,
                    exp_month,
                    exp_year,
                    cvc,
                },
                billing_details: {
                    address,
                    email: req.user.email,
                    name: name || req.user.name,
                    phone,
                },
            });
            if (!paymentMethod) return res.status(401).json({ message: "Verify Card Detail" });

            const attachedPaymentMethod = await stripe.paymentMethods.attach(paymentMethod.id, {
                customer: userStripeInfo.customer,
            });

            if (!customer.invoice_settings.default_payment_method) {
                await stripe.customers.update(userStripeInfo.customer, {
                    invoice_settings: {
                        default_payment_method: attachedPaymentMethod.id,
                    },
                });
            }

            const synced_customer = await stripe.customers.retrieve(userStripeInfo.customer);

            const syncedPaymentMethods = await stripe.customers.listPaymentMethods(synced_customer.id, {
                type: "card",
            });

            const creditCards = syncedPaymentMethods.data.map((pm) => ({
                last4: pm.card.last4,
                exp_month: pm.card.exp_month,
                exp_year: pm.card.exp_year,
                cvc: "Secured",
                billing_details: pm.billing_details,
                id: pm.id,
                default: pm.id === synced_customer.invoice_settings.default_payment_method,
                brand: pm.card.brand,
            }));

            return res.status(200).json(creditCards);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error?.raw?.message || "Something went wrong" });
        }
    })
);

export default userStripeInfoRouter;
