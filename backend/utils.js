import jwt from "jsonwebtoken";
import mg from "mailgun-js";
import getStripe from "./helpers/get-stripe.js";
import { isObject } from "./helpers/isObject.js";
import Gift from "./models/giftModal.js";
import SubscriptionGift from "./models/SubscriptionGift.js";
import User from "./models/userModel.js";
import UserStripeInfo from "./models/userStripeInfoModal.js";

export const generateToken = (id) => {
    return jwt.sign(
        {
            _id: id,
        },
        process.env.JWT_SECRET || "somethingsecret",
        {
            expiresIn: "30d",
        }
    );
};

export const getUser = async (access_token) => {
    let user;

    await new Promise((resolve) => {
        jwt.verify(access_token, process.env.JWT_SECRET || "somethingsecret", async (err, { _id }) => {
            if (!err) user = await User.findById(_id);
            resolve();
        });
    });

    return user;
};

export const isAuth = async (req, res, next) => {
    try {
        const resMsg = { message: "Invalid/Expired Token" };

        if (!req.cookies.access_token) return res.status(401).json(resMsg);

        const user = await getUser(req.cookies.access_token);

        if (!user) return res.status(401).json(resMsg);

        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getGiftSub = async (user) => {
    const giftSub = await SubscriptionGift.findOne({ user: user._id, active: true }).populate("gift");
    if (!giftSub) return null;

    return giftSub;
};

export const giftSubValid = async (giftSub) => {
    if (!giftSub) return false;

    const now_time = new Date().getTime();

    if (now_time < giftSub.cancel_at) return true;

    if (giftSub.active) {
        giftSub.active = false;
        await giftSub.save();
    }

    return false;
};

export const getStripeSubscription = async (user) => {
    const useStripeInfo = await UserStripeInfo.findOne({ user: user._id });
    if (!useStripeInfo) return res.status(401).json(errorRes);

    const stripe = await getStripe();

    let sub;

    try {
        sub = await stripe.subscriptions.retrieve(useStripeInfo.sub);
    } catch (error) {
        return null;
    }

    return sub;
};

export const stripeSubValid = (sub) => {
    if (!sub) return false;

    if (sub.status === "active" || sub.status === "trialing") return true;

    return false;
};

export const is_subscribed = async (user) => {
    const giftSub = await getGiftSub(user);
    if (await giftSubValid(giftSub)) return true;

    const stripeSub = await getStripeSubscription(user);
    if (stripeSubValid(stripeSub)) return true;

    return false;
};

export const isSubscribed = async (req, _, next) => {
    try {
        const errorRes = {
            message: "You're Not Subscribed, Please Subscribe to access this feature.",
            redirect: "/page/subscriptions",
        };

        const giftSub = await getGiftSub(req.user);
        const validGiftSub = await giftSubValid(giftSub);
        if (validGiftSub) {
            req.giftSub = giftSub;
            next();
        }

        if (!giftSub) {
            const sub = await getStripeSubscription(req.user);
            const valid = stripeSubValid(sub);
            if (!valid) return res.status(401).json(errorRes);

            req.sub = sub;

            next();
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const mailgun = () =>
    mg({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMIAN,
    });

export const payOrderEmailTemplate = (order) => {
    return `<h1>Thanks for shopping with us</h1>
  <p>
  Hi ${order.user.name},</p>
  <p>We have finished processing your order.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
      .map(
          (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.qty}</td>
    <td align="right"> $${item.price.toFixed(2)}</td>
    </tr>
  `
      )
      .join("\n")}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Tax Price:</td>
  <td align="right"> $${order.taxPrice.toFixed(2)}</td>
  </tr>

  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>
  `;
};
