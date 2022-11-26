import express from "express";
import expressAsyncHandler from "express-async-handler";
import { mapGiftSub } from "../helpers/map-gift-sub.js";

import Gift from "../models/giftModal.js";
import SubscriptionGift from "../models/SubscriptionGift.js";
import Subscription from "../models/subscriptionModel.js";
import { getGiftSub, getStripeSubscription, giftSubValid, isAuth, stripeSubValid } from "../utils.js";

const subscriptionGiftsRouter = express.Router();

subscriptionGiftsRouter.post(
    "/redeem-sub-gift-code",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const { code } = req.body;

            const stripeSub = await getStripeSubscription(req.user);
            if (stripeSubValid(stripeSub))
                return res.status(401).json({ message: "You're already subscribed", redirect: "/my-subscription" });

            const gift = await Gift.findOne({ code, is_paid: true, type: "subscription" }).populate("buyer");
            if (!gift) return res.status(404).json({ message: "Subscription Gift code not valid" });
            if (gift.usedBy || gift.used_at)
                return res.status(401).json({ message: "Subscription Gift code already used" });

            const day_time = 1000 * 60 * 60 * 24;
            const now_time = new Date().getTime();

            const period_time = gift.period === "year" ? day_time * 365 : day_time * 30;

            const cancel_at = now_time + period_time;

            const currentGiftSub = await getGiftSub(req.user);
            if (await giftSubValid(currentGiftSub)) {
                if (currentGiftSub.targeted_sub._id.toString() !== gift.targeted_ref_id)
                    return res.status(401).json({
                        message: "You're subscribed to another plan, can't merge two different plans!",
                        redirect: "/my-subscription",
                    });

                currentGiftSub.cancel_at += period_time;
                currentGiftSub.period_time += period_time;
                currentGiftSub.active = true;

                const savedGiftSub = await currentGiftSub.save();

                gift.usedBy = req.user._id;
                gift.used_at = now_time;
                gift.ref_id = currentGiftSub._id.toString();

                await gift.save();

                return res.status(200).json(mapGiftSub(savedGiftSub));
            }

            const targeted_sub = await Subscription.findById(gift.targeted_ref_id);
            if (!targeted_sub) return res.status(404).json({ message: "Targeted Subscription not found" });

            const giftSub = await new SubscriptionGift({
                cancel_at,
                start_date: now_time,
                gift: gift,
                user: req.user._id,
                period: gift.period,
                period_time,
                targeted_sub,
                active: true,
            }).save();

            gift.usedBy = req.user._id;
            gift.used_at = now_time;
            gift.ref_id = giftSub._id.toString();

            await gift.save();

            return res.status(200).json(mapGiftSub(giftSub));
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

export default subscriptionGiftsRouter;
