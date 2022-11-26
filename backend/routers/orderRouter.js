import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { isAuth } from "../utils.js";
import Session from "../models/sessionModel.js";
import { getCart } from "./cartRouter.js";
import Chat from "../models/chatModel.js";
import Message from "../models/messageModal.js";
import Socket from "../models/socketModal.js";
import getStripe from "../helpers/get-stripe.js";
import getSettings from "../helpers/getSettings.js";
import UserStripeInfo from "../models/userStripeInfoModal.js";
import get_or_create_stripe_customer from "../helpers/get-or-create-stripe-customer.js";
import PaymentRecord from "../models/paymentRecordModal.js";

const orderRouter = express.Router();

orderRouter.get(
    "/",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const myOrders = await Order.find({ user: req.user._id })
                .populate("user")
                .populate("seller")
                .sort({ createdAt: "-1" });

            const myClientsOrders = await Order.find({ seller: req.user._id })
                .populate("user")
                .populate("seller")
                .sort({ createdAt: "-1" });

            return res.status(200).json([...myOrders, ...myClientsOrders]);
        } catch (error) {
            return res.status(500).json(500);
        }
    })
);

orderRouter.post(
    "/place-order",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const cart = await getCart(req.user);
            if (cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

            if (Object.keys(cart.shippingAddress).some((key) => !cart.shippingAddress[key].trim()))
                return res.status(401).json({
                    message: "Missing Address Fields, Go Back and check your shipping address",
                    redirect: "/shipping",
                });

            const orderItems = [];

            for (const item of cart.items) {
                const product = await Product.findById(item._id);
                if (!product) return res.status(404).json({ message: "Poster not found" });

                const seller = await User.findById(product.seller);
                if (!seller)
                    return res
                        .status(404)
                        .json({ message: `Seller for ${product.name} is not selling posters anymore` });
                if (seller._id.toString() === req.user._id.toString())
                    return res.status(401).json({ message: "You can't buy your own posters" });

                if (!product.forSale)
                    return res.status(401).json({ message: `Poster ${product.name} is not for sale anymore!` });
                if (product.sold)
                    return res.status(401).json({ message: `Poster ${product.name} has been already sold.` });

                orderItems.push({
                    name: product.name,
                    qty: 1,
                    image: product.image,
                    price: product.price,
                    product: product._id,
                });
            }

            const order = new Order({
                seller: cart.currentSellerId,
                orderItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingCost: cart.totalPrice - cart.itemsPrice,
                taxPrice: 0,
                totalPrice: cart.totalPrice,
                allowedToPay: true,
                user: req.user._id,
            });

            await order.save();

            const savedOrder = await Order.findById(order._id).populate("user").populate("seller");

            return res.status(201).json(savedOrder);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

orderRouter.post(
    "/sync-order",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const order = await Order.findById(req.body.orderId).populate("seller").populate("user");
            if (!order) return res.status(404).json({ message: "Order not found" });

            if (order.user._id.toString() !== req.user._id.toString())
                return res.status(401).json({ message: "Unauthorized" });

            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

orderRouter.post(
    "/delete-order",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const order = await Order.findById(req.body.orderId);
            if (!order) return res.status(404).json({ message: "Order not found" });

            const isMine = order.user.toString() === req.user._id.toString();

            if (!isMine || order.isPaid) return res.status(401).json({ message: "Unauthorized" });

            await order.remove();

            return res.status(200).json(null);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

orderRouter.post(
    "/mark-as-delivered",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const user = req.user;
            const io = req.app.locals.settings.io;

            const order = await Order.findById(req.body.orderId).populate("seller").populate("user");
            if (!order) return res.status(404).json({ message: "Order not found" });
            if (order.seller._id.toString() !== user._id.toString())
                return res.status(401).json({ message: "Unauthorized" });
            if (order.isDelivered) return res.status(401).json({ message: "Order is Already Delivered" });
            if (order.isRecieved) return res.status(401).json({ message: "Order Recieved" });
            if (order.haveIssue) return res.status(401).json({ message: "There's an issue" });

            order.isDelivered = true;
            order.deliveredAt = new Date().getTime();
            const savedOrder = await order.save();

            const chat = await Chat.findById(order.chatId).populate("messages");
            if (!chat) return res.status(200).json(savedOrder);

            const message = new Message({
                body: "( Order Delivered )",
                from: user._id,
                chatId: chat._id,
                isStatus: true,
            });

            const savedMessage = await message.save();

            chat.messages.push(message);

            await chat.save();

            for (const socket of await Socket.find({ user: order.seller._id })) {
                if (io.sockets.sockets.has(socket.socketId)) {
                    io.to(socket.socketId).emit("order-status-change", {
                        data: { message: savedMessage.toJSON(), order: savedOrder.toJSON() },
                        success: true,
                    });
                }
            }

            for (const socket of await Socket.find({ user: order.user._id })) {
                if (io.sockets.sockets.has(socket.socketId)) {
                    io.to(socket.socketId).emit("order-status-change", {
                        data: { message: savedMessage.toJSON(), order: savedOrder.toJSON() },
                        success: true,
                    });
                }
            }

            return res.status(200).json(savedOrder);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

orderRouter.post(
    "/mark-as-recieved",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const user = req.user;
            const io = req.app.locals.settings.io;

            const order = await Order.findById(req.body.orderId).populate("seller").populate("user");
            if (!order) return res.status(404).json({ message: "Order not found" });
            if (order.user._id.toString() !== user._id.toString())
                return res.status(401).json({ message: "Unauthorized" });
            if (!order.isDelivered)
                return res
                    .status(401)
                    .json({ message: "You can't mark order as recieved, wait for seller to deliver it" });
            if (order.isRecieved) return res.status(401).json({ message: "Order Already Recieved" });
            if (order.haveIssue) return res.status(401).json({ message: "There's an issue" });

            order.isRecieved = true;
            order.recievedAt = new Date().getTime();
            const savedOrder = await order.save();

            const seller = await User.findById(order.seller._id);
            if (seller) {
                // FIXME:
                const price_after_commission = (savedOrder.totalPrice * (100 - savedOrder.commission_percentage)) / 100;
                seller.pendingBalance -= price_after_commission;
                seller.availableBalance += price_after_commission;
                await seller.save();
            }

            const chat = await Chat.findById(order.chatId).populate("messages");
            if (!chat) return res.status(200).json(savedOrder);

            const message = new Message({
                body: "( Order Recieved )",
                from: user._id,
                chatId: chat._id,
                isStatus: true,
            });

            const savedMessage = await message.save();

            chat.messages.push(message);

            await chat.save();

            for (const socket of await Socket.find({ user: order.user._id })) {
                if (io.sockets.sockets.has(socket.socketId)) {
                    io.to(socket.socketId).emit("order-status-change", {
                        data: { message: savedMessage.toJSON(), order: savedOrder.toJSON() },
                        success: true,
                    });
                }
            }

            for (const socket of await Socket.find({ user: order.seller._id })) {
                if (io.sockets.sockets.has(socket.socketId)) {
                    io.to(socket.socketId).emit("order-status-change", {
                        data: { message: savedMessage.toJSON(), order: savedOrder.toJSON() },
                        success: true,
                    });
                }
            }

            return res.status(200).json(savedOrder);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

orderRouter.post(
    "/create-order-checkout-session",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const { socketId, orderId } = req.body;

            const order = await Order.findById(orderId).populate("seller").populate("user");
            if (!order) return res.status(404).json({ message: "Order not found" });
            if (order.orderItems.length === 0) return res.status(401).json({ message: "Order Empty" });
            if (order.user._id.toString() !== req.user._id.toString())
                return res.status(401).json({ message: "Unauthorized" });

            let product_data = { name: "" };

            for (const orderItem of order.orderItems) {
                const product = await Product.findById(orderItem.product);
                if (!product)
                    return res.status(404).json({ message: `${orderItem.name} Poster not found or may be deleted` });

                const seller = await User.findById(product.seller);
                if (!seller)
                    return res
                        .status(404)
                        .json({ message: `Seller for ${product.name} is not selling posters anymore` });
                if (seller._id.toString() === req.user._id.toString())
                    return res.status(401).json({ message: "You can't buy your own posters" });

                if (!product.forSale)
                    return res.status(401).json({ message: `${product.name} Poster is not for sale more` });

                if (product.sold) return res.status(401).json({ message: `${product.name} Poster Already Sold` });

                product_data = { name: product.name };
            }

            const stripe = await getStripe();

            const customer = await get_or_create_stripe_customer(req.user);

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: { currency: "GBP", product_data, unit_amount: order.totalPrice * 100 },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                metadata: {
                    ref: order._id.toString(),
                    socketId,
                },
                payment_intent_data: {
                    metadata: {
                        ref: order._id.toString(),
                        socketId,
                    },
                },
                customer: customer.id,
                success_url: `${process.env.STRIPE_SUCCESS_URL ?? "http://localhost:3000/payment/success"}`,
                cancel_url: `${process.env.STRIPE_SUCCESS_URL ?? "http://localhost:3000/payment/canceled"}`,
            });

            await Session.deleteMany({ ref: orderId, status: "unpaid" });
            const new_session = new Session({
                id: session.id,
                url: session.url,
                type: "poster",
                ref: order._id.toString(),
                status: session.payment_status,
                user: order.user,
            });

            const { commission_percentage_on_sold_posters } = await getSettings();

            const total_commission_fee = (order.totalPrice * commission_percentage_on_sold_posters) / 100;

            await PaymentRecord.deleteMany({ ref: orderId, status: "pending", collected: false });
            const orderPayment = await new PaymentRecord({
                by: order.user,
                to: order.seller,
                total_collected_amount: order.totalPrice,
                commission_percentage: commission_percentage_on_sold_posters,
                total_commission_fee,
                total_release_amount_after_fee: order.totalPrice - total_commission_fee,
                session: new_session._id,
                type: "order",
                ref: order._id.toString(),
            }).save();

            order.payment_record = advertisePayment._id;
            await order.save();
            new_session.payment_record = orderPayment._id;

            return res.status(200).json(await new_session.save());
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

export const autoReleaseOrders = async () => {
    try {
        const now_time = new Date().getTime();
        const { auto_release_orders_time } = await getSettings();

        const period = now_time - auto_release_orders_time;

        const orders = await Order.find({
            haveIssue: false,
            deliveredAt: { $lte: period },
            paidAt: { $lte: period },
            isPaid: true,
            isRecieved: false,
            isDelivered: true,
        });

        for (const order of orders) {
            order.isRecieved = true;
            order.recievedAt = now_time;
            const savedOrder = await order.save();

            const seller = await User.findById(savedOrder.seller);
            if (seller) {
                seller.pendingBalance -= order.totalPrice;
                seller.availableBalance += order.totalPrice;

                await seller.save();
            }
        }
    } catch (error) {}
};

setInterval(autoReleaseOrders, 1 * 1000);

export default orderRouter;
