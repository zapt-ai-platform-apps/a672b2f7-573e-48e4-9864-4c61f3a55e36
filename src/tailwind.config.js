/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        }
      },
      animation: {
        'wave': 'wave 15s linear infinite',
        'wave-slow': 'wave-slow 20s linear infinite',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) translateZ(0) scaleY(0.8)' },
          '100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' },
        },
        'wave-slow': {
          '0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
          '50%': { transform: 'translateX(-15%) translateZ(0) scaleY(0.9)' },
          '100%': { transform: 'translateX(-30%) translateZ(0) scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
}