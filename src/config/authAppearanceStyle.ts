const authAppearanceStyle = {
  button: {
    background: 'linear-gradient(to right, #4F46E5, #7E22CE)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '10px 15px',
    height: 'auto',
    fontWeight: '500',
    textTransform: 'none' as const, // Added type assertion to fix type error
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  anchor: {
    color: '#A5B4FC',
    textDecoration: 'underline',
  },
  input: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.5rem',
    padding: '10px 15px',
  },
  label: {
    color: '#E0E7FF',
    marginBottom: '0.5rem',
  },
  message: {
    color: '#E0E7FF',
  },
};

export default authAppearanceStyle;