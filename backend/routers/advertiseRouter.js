import express from "express";
import expressAsyncHandler from "express-async-handler";
import Advertise from "../models/advertiseModel.js";
import Stripe from "stripe";
import Setting from "../models/settingModel.js";
import Session from "../models/sessionModel.js";
import { getUser } from "../utils.js";
import getStripe from "../helpers/get-stripe.js";
import getSettings from "../helpers/getSettings.js";
import hasErrors from "../helpers/has-errors.js";
import voucher from "voucher-code-generator";
import get_or_create_stripe_customer from "../helpers/get-or-create-stripe-customer.js";
import PaymentRecord from "../models/paymentRecordModal.js";
import mapAdvertisement from "../helpers/map-advertisement.js";

const advertiseRouter = express.Router();

advertiseRouter.get(
    "/all-advertisements",
    expressAsyncHandler(async (req, res) => {
        try {
            const advertisements = await Advertise.find({ active: true });
            const user = await getUser(req.cookies.access_token);
            return res.status(200).json(advertisements.map((ad) => mapAdvertisement(ad, user)));
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

advertiseRouter.get(
    "/advertisement/:advertisementId",
    expressAsyncHandler(async (req, res) => {
        try {
            const { advertisementId } = req.params;

            if (typeof advertisementId !== "string" || advertisementId.length !== 24)
                return res.status(401).json({ message: "Invalid Advertisement Id" });

            const advertisement = await Advertise.findById(advertisementId);
            if (!advertisement) return res.status(404).json({ message: "Advertisement not found" });

            const user = await getUser(req.cookies.access_token);

            return res.status(200).json(mapAdvertisement(advertisement, user));
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

advertiseRouter.post(
    "/update-advertise",
    expressAsyncHandler(async (req, res) => {
        try {
            let { title, image, type, link, paragraphs, images, private_key, advertisementId } = req.body;

            const advertisement = await Advertise.findById(advertisementId);
            if (!advertisement) return res.status(404).json({ message: "Advertisement not found" });

            if (type !== "sponsor" && type !== "banner" && type !== "advertorial")
                return res.status(401).json({ message: "Advertisement type not supported" });

            const errors = {};

            if (typeof title !== "string" || !title.trim()) errors.title = "Must not be empty";
            if (typeof image !== "string" || !image.trim()) errors.image = "Image Must not be empty";
            if (typeof link !== "string" || !link.trim()) errors.link = "Must not be empty";

            if (hasErrors(errors)) return res.status(401).json(errors);

            if (!Array.isArray(paragraphs)) paragraphs = [];
            if (!Array.isArray(images)) images = [];

            if (advertisement.private_key !== private_key)
                return res.status(401).json({ message: "Invalid Private Key" });

            advertisement.title = title;
            advertisement.link = link;
            advertisement.image = image;
            advertisement.paragraphs = paragraphs;
            advertisement.images = images;

            const savedAdvertisement = await advertisement.save();
            const user = await getUser(req.cookies.access_token);

            return res.status(200).json(mapAdvertisement(savedAdvertisement, user));
        } catch (error) {
            console.log(error);

            return res.status(500).json(error);
        }
    })
);

advertiseRouter.post(
    "/create-advertise",
    expressAsyncHandler(async (req, res) => {
        try {
            let { title, image, type, link, paragraphs, images, period_days } = req.body;
            if (type !== "sponsor" && type !== "banner" && type !== "advertorial")
                return res.status(401).json({ message: "Advertisement type not supported" });

            const errors = {};

            if (typeof title !== "string" || !title.trim()) errors.title = "Must not be empty";
            if (typeof image !== "string" || !image.trim()) errors.image = "Image Must not be empty";
            if (typeof link !== "string" || !link.trim()) errors.link = "Must not be empty";
            if (typeof period_days !== "string" || !period_days.trim()) errors.period_days = "Must not be empty";

            let days = parseInt(period_days);

            if (isNaN(days)) errors.period_days = "Must be a valid period days";
            if (type === "advertorial" && days < 60) errors.period_days = "Must be at least a period of 60 days";
            if (type !== "advertorial" && days < 30) errors.period_days = "Must be at least a period of 30 days";

            if (hasErrors(errors)) return res.status(401).json(errors);

            if (!Array.isArray(paragraphs)) paragraphs = [];
            if (!Array.isArray(images)) images = [];

            const user = await getUser(req.cookies.access_token);

            const codes = voucher.generate({ length: 16, count: 5 });

            const day_time = 1000 * 60 * 60 * 24;

            const advertise = await Advertise.create({
                user: user || null,
                title,
                image,
                type,
                link,
                paragraphs,
                images,
                period_time: day_time * days,
                private_key: codes.join("_"),
            });

            return res.status(200).json(await advertise.save());
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

advertiseRouter.post(
    "/create-checkout-session",
    expressAsyncHandler(async (req, res) => {
        try {
            const { advertiseId, socketId } = req.body;

            const advertise = await Advertise.findById(advertiseId);
            if (!advertise) return res.status(404).json({ message: "Advertise Not Found, Please Try Again" });
            if (advertise.active) return res.status(401).json({ message: "Advertise Already Has Been Activated" });

            const user = await getUser(req.cookies.access_token);

            const { banner_price_for_day, sponsor_price_for_day, advertorial_price_for_day } = await getSettings();
            let price_for_day = 0;

            switch (advertise.type) {
                case "sponsor":
                    price_for_day = sponsor_price_for_day;
                    break;
                case "banner":
                    price_for_day = banner_price_for_day;
                    break;
                case "advertorial":
                    price_for_day = advertorial_price_for_day;
                    break;
            }

            const day_time = 1000 * 60 * 60 * 24;
            const days = advertise.period_time / day_time;
            const totalPrice = days >= 365 ? price_for_day * (days - 60) : days * price_for_day;

            const stripe = await getStripe();

            const customer = user ? await get_or_create_stripe_customer(user) : undefined;

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: "gbp",
                            product_data: {
                                name: advertise.title,
                            },
                            unit_amount: totalPrice * 100,
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
                customer: customer ? customer.id : undefined,
                mode: "payment",
                success_url: process.env.STRIPE_SUCCESS_URL || "http://localhost:3000/payment/success",
                cancel_url: process.env.STRIPE_CANCELED_URL || "http://localhost:3000/payment/canceled",
            });

            await Session.deleteMany({ ref: advertise._id, status: "unpaid" });
            const new_session = new Session({
                id: session.id.toString(),
                url: session.url,
                type: "advertisement",
                ref: advertise._id.toString(),
                status: session.payment_status,
                user: user || null,
            });

            await PaymentRecord.deleteMany({ ref: advertise._id.toString(), status: "pending", collected: false });
            const advertisePayment = await new PaymentRecord({
                by: user ? user : undefined,
                total_collected_amount: totalPrice,
                commission_percentage: 0,
                total_commission_fee: 0,
                total_release_amount_after_fee: totalPrice,
                session: new_session._id,
                type: "advertise",
                ref: advertise._id.toString(),
            }).save();

            advertise.payment_record = advertisePayment._id;
            await advertise.save();
            new_session.payment_record = advertisePayment._id;

            return res.status(200).json(await new_session.save());
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

export default advertiseRouter;
