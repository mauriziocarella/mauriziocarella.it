const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            screens: {
                "3xl": "1940px",
                "4xl": "2260px",
            },
            minWidth: {
                0: "0",
                "1/3": "33.333333%",
                "2/3": "66.666667%",
                "1/4": "25%",
                "1/2": "50%",
                "3/4": "75%",
                full: "100%",
            },
            colors: {
                "success": colors.green[500],
                "success-content": "#ffffff",
                "success-focus": colors.green[600],
                "error": colors.red[500],
                "error-content": "#ffffff",
                "error-focus": colors.red[600],
            }
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("daisyui"),
        require("tailwind-scrollbar"),
    ],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/colors/themes")["[data-theme=light]"],
                },
                dark: {
                    ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
                },
            }
        ]
    }
}
