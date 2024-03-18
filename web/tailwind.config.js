/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {

        extend: {
            screens: {
                'screenReview': '420px',
                'buttonPallette': '860px',
                'buttonSubmit': '570px',
                'logoOdin': '500px',
            },
            scale:{
                '200': '2.0',
            },
            colors: {
                "red-1": "#d10c12",
                "green-2": "#005e1178",
                "green-1": "#005e12",
                "yellow-1": "#fbd83f",
            },
            keyframes: {
                bounce: {
                    "0%, 100%": {
                        transform: "translateX(-25%)",
                    },
                    "50%": {
                        transform: "translateX(0)",
                    },
                },
            },
        },
    },
    plugins: [],
}
