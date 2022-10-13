import { useContext, useEffect } from 'react';

import { AuthContext } from '../providers';

export const useAuth = () => {
  const { updateAuthState, clearAuthState, state, isFetchingUser } = useContext(AuthContext);

  return {
    updateAuthState: (payload, accessToken) => updateAuthState(payload, accessToken),
    clearAuthState: () => clearAuthState(),
    state,
    isFetchingUser,
    isUsingAccessToken: state?.user?.accessToken
  };
};
