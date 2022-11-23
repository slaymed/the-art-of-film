import express from "express";
import expressAsyncHandler from "express-async-handler";

import getStripe from "../helpers/get-stripe.js";
import Gift from "../models/giftModal.js";
import Session from "../models/sessionModel.js";
import Subscription from "../models/subscriptionModel.js";
import { isAuth } from "../utils.js";

const giftsRouter = express.Router();

giftsRouter.get(
    "/list/mine",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const gifts = await Gift.find({ buyer: req.user._id });
            return res.status(200).json(gifts);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

giftsRouter.get(
    "/:giftId",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const { giftId } = req.params;

            const gift = await Gift.findById(giftId);
            if (!gift || gift.buyer.toString() !== req.user._id.toString())
                return res.status(404).json({ message: "Gift not found" });

            return res.status(200).json(gift);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

giftsRouter.post(
    "/buy-gift-sub",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const { targeted_sub_id, period = "month" } = req.body;

            if (period !== "month" && period !== "year")
                return res.status(401).json({ message: "Subscription Period Invalid" });

            const targeted_sub = await Subscription.findById(targeted_sub_id);
            if (!targeted_sub) return res.status(404).json({ message: "Subscription not found" });

            const gift = new Gift({
                buyer: req.user._id,
                targeted_ref_id: targeted_sub._id.toString(),
                type: "subscription",
                period,
            });

            return res.status(201).json(await gift.save());
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

giftsRouter.post(
    "/create-gift-sub-checkout-session",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const { socketId, giftId } = req.body;

            const gift = await Gift.findById(giftId);
            if (!gift) return res.status(404).json({ message: "Subscription Gift not found" });

            const targeted_sub = await Subscription.findById(gift.targeted_ref_id);
            if (!targeted_sub) return res.status(404).json({ message: "Subscription not found" });

            const stripe = await getStripe();

            const product_data = {
                name: `${targeted_sub.name.toUpperCase()} Subscription Gift`,
            };

            const price = gift.period === "year" ? targeted_sub.yearPrice : targeted_sub.monthPrice;

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: { currency: "GBP", product_data, unit_amount: price * 100 },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                metadata: {
                    ref: gift._id.toString(),
                    socketId,
                },
                payment_intent_data: {
                    metadata: {
                        ref: gift._id.toString(),
                        socketId,
                    },
                },
                success_url: `${process.env.STRIPE_SUCCESS_URL ?? "http://localhost:3000/payment/success"}`,
                cancel_url: `${process.env.STRIPE_SUCCESS_URL ?? "http://localhost:3000/payment/canceled"}`,
            });

            await Session.deleteMany({ ref: giftId, status: "unpaid" });

            const new_session = new Session({
                id: session.id,
                url: session.url,
                type: "gift",
                period: gift.period,
                ref: gift._id.toString(),
                status: session.payment_status,
            });

            return res.status(200).json(await new_session.save());
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

export default giftsRouter;
