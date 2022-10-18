import { useMemo, useState } from 'react';
import AppID from 'ibmcloud-appid-js';

import { useAuth, useToast } from '.';
import { UserType, Roles, Scope } from "../constants";

export const useLogin = () => {
  const [isFetching, setFetching] = useState(false);
  const { openToast } = useToast();
  const { updateAuthState } = useAuth();

  const appID = useMemo(() => new AppID(), []);

  return {
    isFetching,
    login: async (userData) => {
      try {
        setFetching(true);

        // await appID.init({
        //   clientId: process.env.REACT_APP_IS_DEV ? process.env.REACT_APP_IBM_CLIENT_ID : window._env_[authissuer].CLIENT_ID,
        //   discoveryEndpoint: process.env.REACT_APP_IS_DEV ? process.env.REACT_APP_IBM_DISCOVERY_ENDPOINT : window._env_[authissuer].DISCOVERY_ENDPOINT,
        // });

        // const { accessToken, idToken, accessTokenPayload, ...response } = await appID.signin();

      
        // The backend requires a token consisting of accessToken + idToken for auth purposes
        // const combinedToken = `${accessToken} ${idToken}`;
        // updateAuthState({ userType, user: {authissuer,  ...response } }, combinedToken);

        updateAuthState(userData, "asdasdasdasdas");

      } catch (e) {
        openToast({ status: 'error', message: e.message || 'Login failed' });
        setFetching(false);
      }
    }
  }
};
