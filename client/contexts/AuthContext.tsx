import React, { useState } from 'react';
import { useKeycloak } from '@react-keycloak-fork/ssr';
import type { SSRAuthClient } from '@react-keycloak-fork/ssr';

const AuthContext = React.createContext<
  | {
      keycloak?: SSRAuthClient;
      kcInitialized: boolean;
      tokensInitialized: boolean;
      setTokensInitialized: (value: boolean) => void;
    }
  | undefined
>(undefined);

const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();
  const [tokensInitialized, setTokensInitialized] = useState(false);

  const value = { keycloak, kcInitialized: initialized, tokensInitialized, setTokensInitialized };

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
