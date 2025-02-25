import themeExtend from './theme.extend.js';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: themeExtend,
  },
  plugins: [],
};