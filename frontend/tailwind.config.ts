import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Ensure it includes TSX files
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;