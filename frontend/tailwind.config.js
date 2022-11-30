/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                base: "#0d1117",
                "light-dark": "#161b22",
                accent: "#fab702",
                tcolor: "#eeeeee",
                footer: "#2c2c2c",
                "dark-card": "#989b9f1a",
            },
            fontSize: {},
            height: {
                "top-nav": "195.61px",
                screen: "100vh",
                "screen-top-nav-less": `calc(100vh - 195.61px)`,
            },
            minHeight: {
                "top-nav": "195.61px",
                "screen-top-nav-less": `calc(100vh - 195.61px)`,
            },
            width: {
                "side-nav": "270px",
                "screen-side-nav-less": `calc(100vw - 270px)`,
            },
            minWidth: {
                "side-nav": "270px",
                "screen-side-nav-less": `calc(100vw - 270px)`,
            },
            transitionProperty: {
                height: "height",
            },
            aspectRatio: {
                "9/16": "9 / 16",
            },
            spacing: {
                21: "5.25rem",
                22: "5.5rem",
                23: "5.75rem",
                "top-nav": "195.61px",
            },
            screens: {
                xs: "480px",
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
