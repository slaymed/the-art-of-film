import Order from "../models/orderModel.js";

const collector = async () => {
    try {
        console.log("called");
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });
        console.log("gg");
    } catch (error) {
        console.log(error);
    }
};

// setInterval(async () => {
//     await collector();
// }, 2000);
