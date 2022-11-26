import getStripe from "./get-stripe.js";

const create_stripe_customer = async (user) => {
    try {
        const stripe = await getStripe();

        const test_clock = await stripe.testHelpers.testClocks.create({
            frozen_time: 1000 * 60 * 60 * 24 * 30,
        });

        const customer = await stripe.customers.create({
            name: user.name,
            email: user.email,
            metadata: {
                userId: user._id,
            },
            test_clock: test_clock.id,
        });

        return customer;
    } catch (error) {
        console.log(error);
        console.log("Failed inside (create_stripe_customer)");
    }
};

export default create_stripe_customer;
