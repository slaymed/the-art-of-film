import mongoose from "mongoose";

const advertiseSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ["banner", "sponsor", "advertorial"],
        },
        title: { type: String, required: true },
        link: { type: String, required: true },
        image: { type: String, required: true },
        active: { type: Boolean, default: false },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    },
    {
        timestamps: true,
    }
);
const Advertise = mongoose.model("Advertise", advertiseSchema);
export default Advertise;
