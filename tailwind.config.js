export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // New or refined color palette
      colors: {
        // Example brand colors; adjust to fit your identity
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
        // Refine or replace neutral grays as needed for better contrast
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
        // Success/error states
        success: '#22c55e',
        error: '#ef4444',
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
        // Add or adjust to achieve a more harmonious vertical rhythm
      },
      // Subtle, consistent box-shadows for cards, modals, etc.
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        DEFAULT: '0 2px 4px rgba(0,0,0,0.1)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
      },
      // Transition timing presets for smoother micro-interactions
      transitionDuration: {
        200: '200ms',
        300: '300ms',
        500: '500ms',
      },
      transitionTimingFunction: {
        'ease-in-out-custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      // Slightly reduce default border-radius for a refined feel
      borderRadius: {
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      },
      // Font families or sizes if you want to refine typography
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};