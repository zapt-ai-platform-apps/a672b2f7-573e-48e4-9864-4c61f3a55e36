import { createContext, useContext } from 'react';

export type User = {
  id: string;
  email: string;
};

export type Session = {
  user: User;
};

export type AuthContextType = {
  session: Session | null;
  loading?: boolean;
  setSession?: (session: Session | null) => void;
  signOut?: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  session: null
});

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};