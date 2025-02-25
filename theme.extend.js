export default {
  colors: {
    brand: {
      50: '#f5faff',
      100: '#e0f2ff',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Primary accent
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    gray: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    },
    success: '#22c55e',
    error: '#ef4444',
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
  },
  boxShadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    DEFAULT: '0 2px 4px rgba(0,0,0,0.1)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
  animation: {
    fadeIn: 'fadeIn 1s ease-out forwards',
    wave: 'wave 15s linear infinite',
    'wave-slow': 'wave-slow 25s linear infinite',
    pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    wave: {
      '0%': { transform: 'translateX(0)' },
      '50%': { transform: 'translateX(-25%)' },
      '100%': { transform: 'translateX(-50%)' },
    },
    'wave-slow': {
      '0%': { transform: 'translateX(0)' },
      '50%': { transform: 'translateX(-15%)' },
      '100%': { transform: 'translateX(-30%)' },
    },
    pulse: {
      '0%, 100%': { opacity: '.6' },
      '50%': { opacity: '.3' },
    },
  },
  transitionDuration: {
    200: '200ms',
    300: '300ms',
    500: '500ms',
  },
  transitionTimingFunction: {
    'ease-in-out-custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  borderRadius: {
    DEFAULT: '6px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  },
};