import express from "express";
import expressAsyncHandler from "express-async-handler";

import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { getSubscription, isAuth, isSubscribed, subValid } from "../utils.js";

const sellerShowcaseRouter = express.Router();

sellerShowcaseRouter.get(
    "/:sellerId",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const { sellerId } = req.params;

        try {
            const seller = await User.findById(sellerId);
            if (!seller) return res.status(404).json({ message: "Showcase not found" });
            const sellerSub = await getSubscription(seller);
            const valid = subValid(sellerSub);
            if (!valid) {
                if (sellerId === req.user._id.toString())
                    return res.status(401).json({
                        message: "Require Subscription, please subscribe so you can see your showcase",
                        redirect: "/page/subscriptions",
                    });

                return res.status(404).json({ message: "Showcase not found" });
            }

            const products = await Product.find({ seller: seller._id })
                .populate("seller")
                .populate("directors")
                .populate("casts")
                .populate("artists");
            if (products.length === 0) return res.status(404).json({ message: "Showcase not found" });

            return res.status(200).json({ seller, products });
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

export default sellerShowcaseRouter;
