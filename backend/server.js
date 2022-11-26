import http from "http";
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { Server } from "socket.io";
import { Worker } from "worker_threads";

import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import subscriptionRouter from "./routers/subscriptionRouter.js";
import userSubscriptionRouter from "./routers/userSubscriptionRouter.js";
import subscriptionGiftsRouter from "./routers/subscriptionGiftsRouter.js";
import giftsRouter from "./routers/giftsRouter.js";
import userStripeInfoRouter from "./routers/userStripeInfoRouter.js";
import sessionRouter from "./routers/sessionRouter.js";
import issueRouter from "./routers/issueRouter.js";
import advertiseRouter from "./routers/advertiseRouter.js";
import webhooksRouter from "./routers/webhooks/index.js";
import globalRouter from "./routers/globalRouter.js";
import cartRouter from "./routers/cartRouter.js";
import chatRouter from "./routers/chatRouter.js";
import Socket from "./models/socketModal.js";
import tagsRouter from "./routers/tagsRouter.js";
import sellerShowcaseRouter from "./routers/sellerShowcaseRouter.js";
import withdrawRequestsRouter from "./routers/withdrawRequestsRouter.js";
import settingsRouter from "./routers/settingsRouter.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/webhooks/stripe")) {
        next();
    } else {
        express.json()(req, res, next);
    }
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

mongoose.connect(
    // FIXME:
    "mongodb://0.0.0.0:27017/theartoffilm" ||
        process.env.MONGODB_URL ||
        "mongodb+srv://aliarsalandev:DojWixpseipvty55@cluster0.qjxzx.mongodb.net/artoffilms?retryWrites=true&w=majority"
);

app.use("/webhooks", webhooksRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/user-subscription", userSubscriptionRouter);
app.use("/api/subscription-gifts", subscriptionGiftsRouter);
app.use("/api/gifts", giftsRouter);
app.use("/api/seller-showcase", sellerShowcaseRouter);
app.use("/api/user-stripe-info", userStripeInfoRouter);
app.use("/api/withdraw-requests", withdrawRequestsRouter);
app.use("/api/products", productRouter);
app.use("/api/posters-tags", tagsRouter);
app.use("/api/issues", issueRouter);
app.use("/api/orders", orderRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/advertise", advertiseRouter);
app.use("/api/globals", globalRouter);
app.use("/api/cart", cartRouter);
app.use("/api/chat", chatRouter);

app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/config/google", (req, res) => {
    res.send(process.env.GOOGLE_API_KEY || "");
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/frontend/build/index.html")));
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

export const server = http.Server(app);

const io = new Server(server);

app.set("io", io);

io.on("connection", async (socket) => {
    socket.on("disconnect", async () => {
        const saved = await Socket.findOne({ socketId: socket.id });
        if (saved) await saved.remove();
    });
});

server.listen(port, async () => {
    const sockets = await Socket.find();
    for (const socket of sockets) await socket.remove();
    console.log(`Serve at http://localhost:${port}`);
});
