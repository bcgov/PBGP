import '../styles/globals.css';

import Head from 'next/head';
import type { AppProps as NextAppProps } from 'next/app';
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak-fork/ssr';

import { Footer, Header } from '@components';
import { AuthProvider } from '@contexts';
import { keycloakConfig } from '@constants';
import { StrictMode } from 'react';

interface AppProps extends NextAppProps {
  cookies: unknown;
}

function App({ Component, pageProps, cookies }: AppProps) {
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakConfig}
      persistor={SSRCookies(cookies)}
      LoadingComponent={<>Authenticating...</>}
      initOptions={{
        pkceMethod: 'S256',
        checkLoginIframe: false,
      }}
    >
      <StrictMode>
        <AuthProvider>
          <Head>
            <title>BC - Programs Branch Grant Programs</title>
            <link rel='icon' href='/assets/img/bc_favicon.ico' />
          </Head>
          <div className='h-full flex flex-col'>
            <Header />
            <main className='flex-grow flex justify-center md:pt-11 pt-5 bg-bcLightBackground'>
              <div className=' w-full xl:w-layout mx-2 mb-12'>
                <Component {...pageProps} />
              </div>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </StrictMode>
    </SSRKeycloakProvider>
  );
}

export default App;
