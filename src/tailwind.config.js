/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'text-shimmer': 'textShimmer 6s linear infinite',
        'wave': 'wave 18s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite',
        'wave-slow': 'wave 20s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite',
        'shine': 'shine 1.5s ease-in-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'width': 'width',
      },
    },
  },
  plugins: [],
};