/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'fairplay-dark': '#0B1320',
                'fairplay-darker': '#070b14',
                'fairplay-orange': '#FF5722',
                'fairplay-cyan': '#00E5FF'
            }
        },
    },
    plugins: [],
}
