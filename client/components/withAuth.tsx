import React, { useEffect } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';

import { useAuthContext } from '@contexts';
import { Spinner } from './Spinner';

const withAuth = (Component: NextComponentType<NextPageContext>) => {
  const Auth = () => {
    const { keycloak, kcInitialized, tokensInitialized } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (kcInitialized && !keycloak?.authenticated) {
        router.replace('/login');
      }
    }, [kcInitialized, keycloak?.authenticated]);

    // Loading while keycloak is initializing
    if (!kcInitialized) return <Spinner className='h-10 w-10' />;

    // Loading after we've been authenticated but haven't received tokens
    if (!keycloak?.authenticated || !tokensInitialized) return <Spinner className='h-10 w-10' />;

    return <Component />;
  };

  return Auth;
};

export default withAuth;
