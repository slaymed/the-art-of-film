import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Session from "../models/sessionModel.js";
const sessionRouter = express.Router();
sessionRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdSession = await Session.insertMany(data.sessions);
    res.send({ createdSession });
  })
);

export default sessionRouter;
