import express from "express";
import expressAsyncHandler from "express-async-handler";
import Advertise from "../models/advertiseModel.js";
import Stripe from "stripe";
import Setting from "../models/settingModel.js";
import Session from "../models/sessionModel.js";

const advertiseRouter = express.Router();

advertiseRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const advertisements = await Advertise.find({ active: true });
        return res.status(200).json(advertisements);
    })
);

advertiseRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        try {
            const { title, image, type, link } = req.body;

            const advertise = await Advertise.create({
                title,
                image,
                type,
                link,
                user: req.user?._id,
            });
            await advertise.save();
            res.status(200).json({ _id: advertise._id.toString() });
        } catch (error) {
            res.status(500).json(error);
        }
    })
);

advertiseRouter.post(
    "/create-checkout-session",
    expressAsyncHandler(async (req, res) => {
        try {
            const amount = 1000;
            const { advertiseId, socketId } = req.body;

            const advertise = await Advertise.findById(advertiseId);
            if (!advertise) return res.status(404).json({ message: "Advertise Not Found, Please Try Again" });
            if (advertise.active) return res.status(401).json({ message: "Advertise Already Has Been paid" });

            const { stripe_private_key } = await Setting.findOne();
            const stripe = new Stripe(stripe_private_key);

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: "gbp",
                            product_data: {
                                name: advertise.title,
                            },
                            unit_amount: +amount,
                        },
                        quantity: 1,
                    },
                ],
                metadata: {
                    ref: advertise._id.toString(),
                    socketId,
                },
                payment_intent_data: {
                    metadata: {
                        ref: advertise._id.toString(),
                        socketId,
                    },
                },
                mode: "payment",
                success_url: process.env.STRIPE_SUCCESS_URL || "http://localhost:3000/payment/success",
                cancel_url: process.env.STRIPE_CANCELED_URL || "http://localhost:3000/payment/canceled",
            });

            const new_session = new Session({
                id: session.id.toString(),
                url: session.url,
                type: "advertisement",
                period: "month",
                ref: advertise._id.toString(),
                status: session.payment_status,
            });

            const createdSession = await new_session.save();

            delete createdSession.payment_intent_id;

            return res.status(200).json(createdSession);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

export default advertiseRouter;
