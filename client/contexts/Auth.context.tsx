import React from 'react';
import { useKeycloak } from '@react-keycloak-fork/ssr';
import type { SSRAuthClient } from '@react-keycloak-fork/ssr';

const AuthContext = React.createContext<
  | {
      keycloak?: SSRAuthClient;
      kcInitialized: boolean;
      tokensInitialized: boolean;
    }
  | undefined
>(undefined);

const AuthProvider: React.FC<{
  tokensInitialized: boolean;
  children: React.ReactNode;
}> = ({ tokensInitialized, children }) => {
  const { keycloak, initialized } = useKeycloak();

  const value = { keycloak, kcInitialized: initialized, tokensInitialized };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
}

// Change to their email later on, make a ticket for this.
const getUserId = () => useAuthContext().keycloak?.idTokenParsed?.sub;

export { AuthProvider, useAuthContext, getUserId };
