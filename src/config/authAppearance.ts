export const authAppearanceConfig = {
  theme: 'default',
  variables: {
    default: {
      colors: {
        brand: '#4F46E5',
        brandAccent: '#6366F1',
      },
      borderRadii: {
        button: '1rem',
        input: '0.75rem',
      },
    },
  },
  style: {
    button: {
      background: 'linear-gradient(to right, #4F46E5, #6366F1)',
      padding: '14px 20px',
      borderRadius: '14px',
      boxShadow: '0 4px 8px rgba(79, 70, 229, 0.2)',
      transition: 'all 0.3s ease',
      border: 'none',
      fontWeight: '600',
    },
    anchor: {
      color: '#4F46E5',
      transition: 'color 0.2s ease',
      fontWeight: '500',
    },
    container: {
      borderRadius: '14px',
    },
    input: {
      borderRadius: '12px',
      transition: 'all 0.2s ease',
    },
  },
  className: {
    button: 'cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300',
    input: 'box-border focus:ring-2 focus:ring-indigo-500 transition-all duration-200',
    container: 'rounded-xl overflow-hidden',
    label: 'mb-2 font-medium',
    anchor: 'hover:text-indigo-700 font-medium',
  },
};