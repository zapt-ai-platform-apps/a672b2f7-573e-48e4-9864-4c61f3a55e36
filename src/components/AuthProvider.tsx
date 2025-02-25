import React from 'react';
import { AuthContext } from '../context/AuthContext';
import useAuthSession from '../hooks/useAuthSession';
import SignIn from './SignIn';

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { session, setSession, signOut } = useAuthSession();

  return (
    <AuthContext.Provider value={{ session, setSession, signOut }}>
      <div className="min-h-screen">
        {session && (
          <div className="p-4 flex justify-end">
            <button
              onClick={signOut}
              className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded"
            >
              Sign Out
            </button>
          </div>
        )}
        {children}
      </div>
    </AuthContext.Provider>
  );
}

export default AuthProvider;