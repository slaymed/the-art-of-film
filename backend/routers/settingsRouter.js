import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import data from "../data.js";
import Setting from "../models/settingModel.js";

const settingsRouter = express.Router();

settingsRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const setting = await Setting.find();
    res.send({ setting: setting[0] });
  })
);

settingsRouter.put(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const {
      commission,
      stripe_private_key,
      site_logo,
      site_favicon,
      site_keywords,
    } = req.body;
    const setting = await Setting.findOne();

    if (setting === null) {
      const newSetting = new Setting({
        commission,
        stripe_private_key,
        site_logo,
        site_favicon,
        site_keywords,
      });
      await newSetting.save();
      res.send({
        settings: setting,
        message: "Setting created",
      });
    } else {
      setting.commission = commission;
      setting.stripe_private_key = stripe_private_key;
      setting.site_logo = site_logo;
      setting.site_favicon = site_favicon;
      setting.site_keywords = site_keywords;
      await setting.save();
      res.send({
        message: "Settings Updated",
        settings: setting,
      });
    }
  })
);

settingsRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const setting = await Setting.insertMany(data.settings);
    res.send({ setting });
  })
);

export default settingsRouter;
