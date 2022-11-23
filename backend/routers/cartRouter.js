import express from "express";
import expressAsyncHandler from "express-async-handler";

import Cart, { defaultShippingAddress } from "../models/cartModal.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

import { isAuth } from "../utils.js";

export const getCart = async (user) => {
    let cart = await Cart.findById(user.cart).populate("items");

    if (!cart) {
        cart = new Cart({ user: user._id });
        await cart.save();

        user.cart = cart._id;
        await user.save();
    }

    return cart;
};

const calcPrices = async (cart) => {
    let itemsPrice = 0;
    let totalPrice = 0;

    const seller = await User.findById(cart.currentSellerId);
    const { rolled_folded_shipping_cost } = seller;

    for (const product of cart.items) {
        if (!product) continue;

        itemsPrice += product.price;
    }

    const { code } = cart.shippingAddress;

    const rolledFolded = rolled_folded_shipping_cost[code] || rolled_folded_shipping_cost.default;

    const shippingCost = rolledFolded[cart.lastPosterType.toLowerCase()];

    totalPrice = itemsPrice + (cart.items.length - 1) + shippingCost;

    return { itemsPrice, totalPrice };
};

const cartRouter = express.Router();

cartRouter.get(
    "/",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const cart = await getCart(req.user);
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

cartRouter.post(
    "/add",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const { productId } = req.body;

            const product = await Product.findById(productId);
            if (!product) return res.status(404).json({ message: "Product not found" });

            const seller = await User.findById(product.seller);
            if (!seller) return res.status(404).json({ message: "Can't buy from this seller, Try Again Later" });
            if (seller._id.toString() === req.user._id.toString())
                return res.status(401).json({ message: "You can't add your own posters to cart" });

            if (product.sold) return res.status(401).json({ message: "Poster already sold" });
            if (!product.forSale) return res.status(401).json({ message: "Poster not for sale anymore!" });

            const cart = await getCart(req.user);

            if (cart.items.length > 0) {
                if (
                    product.rolledFolded.trim().toLowerCase() &&
                    cart.lastPosterType.toLowerCase() !== product.rolledFolded.toLowerCase()
                )
                    return res.status(401).json({
                        mesage: "All Posters Must be of one type Rolled/Follded You can't ship both at the same time",
                    });

                if (cart.currentSellerId !== seller._id.toString())
                    return res.status(404).json({ message: "You must only buy from one seller at a time" });

                if (cart.items.find((item) => item._id.toString() === product._id.toString()))
                    return res.status(401).json({ message: "Poster already added" });
            }

            cart.items.push(product);
            cart.currentSellerId = seller._id.toString();
            cart.lastPosterType = product.rolledFolded || "Rolled";

            const { itemsPrice, totalPrice } = await calcPrices(cart);

            cart.itemsPrice = itemsPrice;
            cart.totalPrice = totalPrice;

            return res.status(200).json(await cart.save());
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

cartRouter.post(
    "/shipping-address",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const { address, city, postalCode, code, country } = req.body;

            const cart = await getCart(req.user);

            cart.shippingAddress = { address, city, postalCode, code, country };

            return res.status(200).json(await cart.save());
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

cartRouter.post(
    "/clear",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const cart = await getCart(req.user);

            cart.items = [];
            cart.shippingAddress = defaultShippingAddress;
            cart.itemsPrice = 0;
            cart.totalPrice = 0;
            cart.currentSellerId = null;
            cart.lastPosterType = "";

            return res.status(200).json(await cart.save());
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

export default cartRouter;
