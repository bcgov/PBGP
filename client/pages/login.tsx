import { Button } from '@components';
import { useAuthContext } from '@contexts';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default () => {
  const { keycloak, kcInitialized } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!kcInitialized) return;
    if (keycloak?.authenticated) {
      router.push('/');
    }
  }, [router, kcInitialized, keycloak?.authenticated]);

  const login = () => {
    keycloak?.login({ idpHint: 'idir' });
  };

  return (
    <div className='h-full grid grid-cols-2 gap-20'>
      <div className='flex flex-col justify-center'>
        <h2 className='text-4xl'>BC Air Access Program Application</h2>
        <p>
          The BC Air Access Program (BCAAP) is an application-based program that provides capital
          cost-sharing contributions to aviation infrastructure projects. This includes facility
          master plans, greenhouse gas audits or baselining, and GPS approaches. Support to the
          aviation sector is critical to helping BC address its responsibilities concerning medevac,
          wildfire suppression, emergency response, access to remote (often Indigenous) communities,
          clean transportation, tourism, and economic development.
        </p>
      </div>
      <div className='flex items-center'>
        <Button variant='primary' onClick={login}>
          Login
        </Button>
      </div>
    </div>
  );
};
