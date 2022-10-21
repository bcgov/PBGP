import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import logo from '@assets/img/bc_logo.png';
import { Button } from './Button';
import { useAuthContext } from '@contexts';

export const Header: React.FC = () => {
  const router = useRouter();
  const { keycloak } = useAuthContext();
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headerRef?.current?.focus();
  }, [router.asPath]);

  const handleLogout = () => {
    keycloak?.logout({ redirectUri: location.origin + '/' });
  };

  return (
    <header className='w-full py-2 border-b-2 bg-bcBluePrimary border-bcYellowPrimary flex justify-center'>
      <div className='w-full 2xl:w-2/3 h-full flex flex-row items-center align-center justify-between px-2 md:px-12'>
        <div className='layout-grid gap-0 h-full flex flex-row items-center align-center'>
          <Link href='/'>
            <a>
              <img src={logo.src} alt='government of british columbia' width={160} height={45} />
            </a>
          </Link>
          <div className='ml-7 pl-7 border-l-2 border-bcYellowPrimary'>
            <h1
              tabIndex={-1}
              ref={headerRef}
              className=' font-semibold tracking-wider text-white lg:text-xl md:text-xl text-sm focus:outline-none'
            >
              Ministry of Transportation and Infrastructure
            </h1>
          </div>
        </div>
        <div>
          {keycloak?.authenticated ? (
            <Button variant='secondary' onClick={handleLogout}>
              Logout
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
};
