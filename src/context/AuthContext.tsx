import { createContext } from 'react';

type User = {
  id: string;
  email: string;
};

type Session = {
  user: User;
};

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: false,
  signOut: () => {}
});