import React from 'react';
import { useKeycloak } from '@react-keycloak-fork/ssr';
import type { SSRAuthClient } from '@react-keycloak-fork/ssr';

export interface UserInterface {
  id: string;
  displayName: string;
  isAdmin: boolean;
  isAuthorized: boolean;
  userName?: string;
}
export interface AuthInterface {
  keycloak?: SSRAuthClient;
  kcInitialized: boolean;
  tokensInitialized: boolean;
  user?: UserInterface;
}

const AuthContext = React.createContext<AuthInterface | undefined>(undefined);

const AuthProvider: React.FC<{
  tokensInitialized: boolean;
  user: UserInterface | undefined;
  children: React.ReactNode;
}> = ({ tokensInitialized, user, children }) => {
  const { keycloak, initialized } = useKeycloak();

  const value = { keycloak, kcInitialized: initialized, tokensInitialized, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuthContext };
