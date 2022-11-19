import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    commission: { type: Number, default: 0 },
    stripe_private_key: { type: String, default: "" },
    site_logo: { type: String, default: "" },
    site_favicon: { type: String, default: "" },
    site_keywords: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
const Setting = mongoose.model("Setting", settingSchema);
export default Setting;
