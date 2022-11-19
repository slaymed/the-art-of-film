import bcrypt from "bcryptjs";

const data = {
    users: [
        {
            name: "Slayer Med",
            email: "slay.med1@gmail.com",
            password: bcrypt.hashSync("Slayer8991"),
            sellerName: "slayer",
            logo: "/images/logo1.png",
            description: "I'm best seller",
            rating: 4.6,
            numReviews: 118,
        },
        {
            name: "Mohamed Bedr",
            email: "mohabedr34@gmail.com",
            password: bcrypt.hashSync("Slayer8991"),
            sellerName: "mohamedbedr",
            logo: "/images/logo2.png",
            description: "best seller",
            rating: 4.6,
            numReviews: 118,
        },
    ],
    products: [
        {
            name: "Raiders of the Lost Ark",
            // brand: '',
            // category: 'Filme Poster',
            image: "/images/posters/Raiders-of-the-Lost-Ark.jpg",
            images: [],
            director: "",
            cast: "",
            artist: "",
            origin: "",
            year: 1930,
            format: "",
            condition: "",
            rolledFolded: "",
            countInStock: 1,
            price: 75,
            salePrice: 0,
            description: "",
            rating: 0.0,
            numReviews: 0,
            visible: true,
            forSale: true,
            sold: false,
        },
    ],
    directors: [
        {
            name: "Steven Spielberg",
        },
    ],
    casts: [
        {
            name: "James Cameron",
        },
    ],
    artists: [
        {
            name: "Drew Struzen",
        },
    ],
    subscriptions: [
        {
            name: "SILVER",
            itsPopular: false,
            monthly_discount: {
                percent: 10,
                duration: "repeating",
                duration_in_months: 3,
            },
            yearly_discount: {
                percent: 15,
                duration: "repeating",
                duration_in_months: 36,
            },
            monthPrice: 6,
            yearPrice: 60,
            perks: ["500 showcase poster uploads.", "Up to 4 images per poster.", "Shop store and dashboard."],
        },
        {
            name: "GOLD",
            itsPopular: true,
            monthly_discount: {
                percent: 10,
                duration: "repeating",
                duration_in_months: 3,
            },
            yearly_discount: {
                percent: 15,
                duration: "repeating",
                duration_in_months: 36,
            },
            monthPrice: 9,
            yearPrice: 90,
            perks: ["800 showcase poster uploads.", "Up to 4 images per poster.", "Shop store and dashboard."],
        },
        {
            name: "PLATINUM",
            itsPopular: false,
            monthly_discount: {
                percent: 10,
                duration: "repeating",
                duration_in_months: 3,
            },
            yearly_discount: {
                percent: 15,
                duration: "repeating",
                duration_in_months: 36,
            },
            monthPrice: 12,
            yearPrice: 120,
            perks: ["1000 showcase poster uploads.", "Up to 4 images per poster.", "Shop store and dashboard."],
        },
    ],
    sessions: [
        {
            id: "cs_test_a1UeVQoEvc4BRLQ0keGpiEu2Gs1p2NzXajqVfBXW6u3HTEpkM7Dvcv2DQ1",
            url: "https://api.cloudinary.com/v1_1/dzqjqjqj/image/upload/v1599098983/session_1.jpg",
            type: "subscription",
            period: "month",
            ref: "62ab15ac2f9d575c9c1617a8",
            status: "unpaid",
        },
    ],
    settings: [
        {
            commission: 0.0,
            stripe_private_key:
                "sk_test_51Lw2B5EMpZJ2Skld3EQ2if3mxLKAeFDHky1bj8IBMtT01cbm2oI5ZcaMkUwZjuXaNjBQnLJ5UVtpFZSSHrxRY4rW00orDnnqxU",
            site_logo: "",
            site_favicon: "",
            site_keywords: "",
        },
    ],
    messages: [
        {
            user: "6355337b3d9ac65029d5541a",
            order: "63553482d1cc61cd99730a87",
            message: "Hello",
            read: false,
        },
    ],
};
export default data;
