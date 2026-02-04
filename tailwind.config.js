/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                royal: {
                    green: "#0B2822",
                    gold: "#D4AF37",
                    goldDark: "#C5A028",
                    cream: "#F5F5F0",
                    red: "#8B0000",
                },
            },
            fontFamily: {
                serif: ['var(--font-playfair)', 'serif'],
                sans: ['var(--font-lato)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}