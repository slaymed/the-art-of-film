import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, isAuth } from "../utils.js";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../helpers/mail.js";
import Cart from "../models/cartModal.js";
import Socket from "../models/socketModal.js";
import getStripe from "../helpers/get-stripe.js";
import UserStripeInfo from "../models/userStripeInfoModal.js";
import create_stripe_customer from "../helpers/create_stripe_customer.js";
import get_or_create_user_stripe_info from "../helpers/get_or_create_user_stripe_info.js";

const userRouter = express.Router();

userRouter.get(
    "/authenticated",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            return res.status(200).json(req.user);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

userRouter.post(
    "/register-socket",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const { socketId } = req.body;

            const found = await Socket.findOne({ socketId });
            if (!found) await new Socket({ socketId: req.body.socketId, user: req.user._id }).save();
            return res.status(200).json("done");
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

userRouter.get(
    "/seed",
    expressAsyncHandler(async (req, res) => {
        try {
            // await User.remove({});
            const createdUsers = await User.insertMany(data.users);

            return res.status(200).json({ createdUsers });
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

userRouter.post(
    "/signin",
    expressAsyncHandler(async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user || !bcrypt.compareSync(req.body.password, user.password))
                res.status(401).json({ message: "Invalid email or password" });

            const token = generateToken(user._id.toString());

            res.cookie("access_token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });

            if (req.body.socketId) {
                const found = await Socket.findOne({ socketId: req.body.socketId });
                if (!found) await new Socket({ socketId: req.body.socketId, user: user._id }).save();
            }

            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

userRouter.post(
    "/signout",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            res.clearCookie("access_token");

            if (req.body.socketId) {
                const socket = await Socket.findOne({ socketId: req.body.socketId });
                if (socket) await socket.remove();
            }

            return res.status(200).json(null);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

userRouter.post(
    "/update",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const {
                name,
                password,
                sellerName,
                email,
                logo,
                description,
                address,
                city,
                country,
                code,
                postalCode,
                rolled_folded_shipping_cost,
            } = req.body;

            const user = await User.findById(req.user._id);

            if (name) user.name = name;
            if (password) user.password = bcrypt.hashSync(password, 8);
            if (sellerName) user.sellerName = sellerName;
            if (email) user.email = email;
            if (logo) user.logo = logo;
            if (description) user.description = description;
            if (address) user.address = address;
            if (city) user.city = city;
            if (country) user.country = country;
            if (code) user.code = code;
            if (postalCode) user.postalCode = postalCode;
            if (rolled_folded_shipping_cost) user.rolled_folded_shipping_cost = rolled_folded_shipping_cost;

            return res.status(200).json(await user.save());
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

userRouter.post(
    "/register",
    expressAsyncHandler(async (req, res) => {
        try {
            const userFound = await User.findOne({ email: req.body.email });
            if (userFound) return res.status(401).json({ message: "Email Already Taken" });

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                sellerName: req.body.sellerName,
            });

            const cart = new Cart({
                items: [],
                user: user._id,
            });

            user.cart = cart._id;

            await cart.save();

            const createdUser = await user.save();

            await get_or_create_user_stripe_info(user);

            const token = generateToken(createdUser._id.toString());

            res.cookie("access_token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });

            if (req.body.socketId) {
                const found = await Socket.findOne({ socketId: req.body.socketId });
                if (!found) await new Socket({ socketId: req.body.socketId, user: user._id }).save();
            }

            return res.status(200).json(createdUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

// reset password route
userRouter.post(
    "/reset-password",
    expressAsyncHandler(async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(200).json({ message: "Check your email for the link to reset your password" });

            const token = crypto.randomBytes(20).toString("hex");
            user.resetPasswordToken = token;
            user.resetPasswordExpires = new Date().getTime() + 3600000; // 1 hour
            await user.save();

            sendResetPasswordEmail({
                host: req.headers.host,
                email: user.email,
                token,
                onSuccess: () => {
                    return res.status(200).json({ message: "Check your email for the link to reset your password" });
                },
                onError: (error) => {
                    return res.status(500).json({ message: "Error in sending email" });
                },
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

// complete password reset route
userRouter.post(
    "/reset-password/:token",
    expressAsyncHandler(async (req, res) => {
        try {
            const user = await User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { $gt: new Date().getTime() },
            });
            if (!user) return res.status(401).json({ message: "Password reset token is invalid or has been expired." });

            user.password = bcrypt.hashSync(req.body.password, 8);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            const updatedUser = await user.save();

            return res.status(200).json({
                ...updatedUser,
                token: generateToken(updatedUser),
                message: "Password reset successfully",
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

export default userRouter;
