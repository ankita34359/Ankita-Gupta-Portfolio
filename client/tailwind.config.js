/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: {
                    bg: '#0a0a0a',
                    card: '#111111',
                    text: '#ffffff',
                    accent: '#0070f3'
                },
                light: {
                    bg: '#ffffff',
                    card: '#f4f4f4',
                    text: '#000000',
                    accent: '#0070f3'
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
