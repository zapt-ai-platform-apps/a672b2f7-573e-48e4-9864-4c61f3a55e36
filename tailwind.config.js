export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Refined color palette
      colors: {
        brand: {
          50: '#eefaff',
          100: '#dcf5ff',
          200: '#b3ecff',
          300: '#85ddff',
          400: '#42c9ff',
          500: '#2aa8eb', // Primary accent - slightly warmer blue
          600: '#1c85c8',
          700: '#1a6ca3',
          800: '#1d5886',
          900: '#1e4a71',
        },
        green: {
          50: '#effdf4',
          100: '#d7f7e2',
          200: '#b0ecc7',
          300: '#7fdca5',
          400: '#4bc47f',
          500: '#33ab66', // Success - warmer green
          600: '#208a51',
          700: '#1d6e44',
          800: '#1b583a',
          900: '#194832',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#e05252', // Error - warmer red
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        yellow: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Warning
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      // Refined spacing scale
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
      // Improved box-shadows
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        DEFAULT: '0 2px 4px rgba(0,0,0,0.08)',
        md: '0 4px 6px rgba(0,0,0,0.08)',
        lg: '0 8px 16px rgba(0,0,0,0.08)',
        xl: '0 12px 24px rgba(0,0,0,0.12)',
      },
      // Refined border radius
      borderRadius: {
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },
      // Improved font family
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      // Animation effects
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};