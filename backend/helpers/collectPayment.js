import PaymentRecord from "../models/paymentRecordModal.js";
import User from "../models/userModel.js";

const collectPayment = async (paymentId, userId, release = false) => {
    let user;

    if (userId) {
        user = await User.findById(userId);
        if (!user) throw new Error("user not found");
    }

    const payment = await PaymentRecord.findById(paymentId).populate("by");
    if (!payment) throw new Error("Payment Record not found");

    if (user && payment.by && payment.by._id.toString() !== user._id.toString()) throw new Error("Unauthorized");

    const now_time = new Date().getTime();

    if (!payment.collectd) {
        payment.collected_at = now_time;
        payment.collected = true;
    }
    if (release) {
        payment.released = true;
        payment.released_at = now_time;
    }

    await payment.save();

    return payment;
};

export default collectPayment;
