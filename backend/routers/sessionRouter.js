import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Session from "../models/sessionModel.js";
const sessionRouter = express.Router();
sessionRouter.get(
    "/seed",
    expressAsyncHandler(async (req, res) => {
        try {
            const createdSession = await Session.insertMany(data.sessions);
            return res.status(201).json({ createdSession });
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

export default sessionRouter;
