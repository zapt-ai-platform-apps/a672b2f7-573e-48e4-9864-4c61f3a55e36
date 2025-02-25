import { ThemeSupa } from '@supabase/auth-ui-shared';

export const authAppearanceConfig = {
  theme: ThemeSupa,
  style: {
    button: {
      background: '#FF6B6B',
      color: 'white',
    },
    anchor: {
      color: '#FF4757',
    },
  },
  variables: {
    default: {
      colors: {
        brand: '#FF6B6B',
        brandAccent: '#FF4757',
      },
    },
  },
};

export default authAppearanceConfig;