/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],

    theme: {
        extend: {
            fontFamily: {
                'black-ops': ['Black Ops One', 'system-ui'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            animation: {
                shimmer: 'shimmer 2s linear infinite',
                gradient: 'gradient 8s linear infinite',
                'meteor-effect': 'meteor 5s linear infinite',
            },
            keyframes: {
                shimmer: {
                    from: {
                        backgroundPosition: '0 0',
                    },
                    to: {
                        backgroundPosition: '-200% 0',
                    },
                },
                gradient: {
                    to: { 'background-position': '200% center' },
                },
                meteor: {
                    '0%': {
                        transform: 'rotate(215deg) translateX(0)',
                        opacity: 1,
                    },
                    '70%': { opacity: 1 },
                    '100%': {
                        transform: 'rotate(215deg) translateX(-500px)',
                        opacity: 0,
                    },
                },
            },
        },
    },
    plugins: [],
}
