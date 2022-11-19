import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        url: { type: String, required: true },
        type: {
            type: String,
            required: true,
            enum: ["subscription", "poster", "advertisement"],
        },
        ref: { type: mongoose.Schema.Types.ObjectId },
        period: { type: String, enum: ["month", "year"] },
        status: { type: String, required: true, enum: ["unpaid", "paid", "refunded"] },
        payment_intent_id: { type: String },
        lifeCycle: {
            type: String,
            enum: ["payment_intent.succeeded", "charge.refunded"],
        },
        refund: {
            type: Object,
            default: null,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    },
    {
        timestamps: true,
    }
);
const Session = mongoose.model("Session", sessionSchema);
export default Session;
