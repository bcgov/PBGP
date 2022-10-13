import React, { useState, createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Route } from '../constants';
import { fetchUser } from 'hooks/fetchUser';
import { useToast } from 'hooks';

// Construct auth state to be saved to local storage based on
// user/auth objs fetched from AppID/backend
const authStateObj = (res, userType, authissuer) => {
  const { accessToken, idToken, accessTokenPayload, ...response } = res;

  // The backend requires a token consisting of accessToken + idToken for auth purposes
  // Note: This will only be in place when login page is used - not when ingress authentication is used
  const combinedToken = accessToken && idToken && `${accessToken} ${idToken}`;

  return { userType, user: { accessToken: combinedToken, authissuer,  idTokenPayload: {...response } }};
}

const initialState = {
  isAuthenticated: false,
  userType: '',
  user: {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children, authIssuer, userType }) => {
  const history = useHistory();
  const { openToast } = useToast();

  const dehydratedState = localStorage.getItem('auth') || null;
  const [state, setState] = useState(dehydratedState ? JSON.parse(dehydratedState) : initialState);
  const [isFetchingUser, setFetchingUser] = useState(false);

  const updateAuthState = (payload, accessToken) => {
    const data = { ...payload, isAuthenticated: true };

    data.user.accessToken = accessToken || state?.user?.accessToken;

    localStorage.setItem('auth', JSON.stringify(data));
    setState(data);
  };

  const clearAuthState = () => {
    const data = { ...initialState, userType: state.userType };
    localStorage.setItem('auth', JSON.stringify(data));
    setState(data);

    // TODO: Re-enable prompt for re-authentication (excluded from 2.9 release)
    window.location.replace(Route.AppIDLogout);
  };

  // Fetch user object from backend on load
  useEffect(() => {
    (async () => {
      try {
        setFetchingUser(true);
        const user = await fetchUser(authIssuer);
        updateAuthState(authStateObj(user, userType, authIssuer))
      } catch (e) {
        if (state.isAuthenticated) {
          openToast({ status: 'error', message: 'Authentication error. Please login again' });
          clearAuthState();
        }
      } finally {
        setFetchingUser(false);
      }
    })();
  }, [state.isAuthenticated]);

  const contextValue = {
    updateAuthState,
    clearAuthState,
    isFetchingUser,
    state,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
