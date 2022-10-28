import '../styles/globals.css';

import Head from 'next/head';
import type { AppProps as NextAppProps } from 'next/app';
import { SSRKeycloakProvider, SSRCookies, SSRAuthClient } from '@react-keycloak-fork/ssr';

import { Footer, Header } from '@components';
import { AuthProvider } from '@contexts';
import { keycloakConfig } from '@constants';
import { StrictMode, useState } from 'react';
import axios from 'axios';
import { FormProvider } from 'components/form/FormContext';

interface AppProps extends NextAppProps {
  cookies: unknown;
}

type TokensType = Pick<SSRAuthClient, 'token' | 'refreshToken'>;

function App({ Component, pageProps, cookies }: AppProps) {
  const [tokensInitialized, setTokensInitialized] = useState(false);

  const handleTokens = (tokens: TokensType) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.token}`;
    setTokensInitialized(true);
  };

  return (
    <SSRKeycloakProvider
      persistor={SSRCookies(cookies)}
      keycloakConfig={keycloakConfig}
      onTokens={handleTokens}
    >
      <StrictMode>
        <AuthProvider tokensInitialized={tokensInitialized}>
          <Head>
            <title>BC - Programs Branch Grant Programs</title>
            <link rel='icon' href='/assets/img/bc_favicon.ico' />
          </Head>
          <div className='h-full flex flex-col'>
            <Header />
            <main className='flex-grow flex justify-center bg-bcLightBackground'>
              <div className=' w-full xl:w-layout mb-12'>
                <FormProvider>
                  <Component {...pageProps} />
                </FormProvider>
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
