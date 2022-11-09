import '../styles/globals.css';

import Head from 'next/head';
import type { AppProps as NextAppProps } from 'next/app';
import { SSRKeycloakProvider, SSRCookies, SSRAuthClient } from '@react-keycloak-fork/ssr';

import { Footer, Header } from '@components';
import { AuthProvider, UserInterface } from '@contexts';
import { keycloakConfig } from '@constants';
import { StrictMode, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

interface AppProps extends NextAppProps {
  cookies: unknown;
}

type TokensType = Pick<SSRAuthClient, 'token' | 'refreshToken'>;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

function App({ Component, pageProps, cookies }: AppProps) {
  const [tokensInitialized, setTokensInitialized] = useState(false);
  const [user, setUser] = useState<UserInterface>();

  const handleTokens = (tokens: TokensType) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.token}`;
    validateUser();
  };

  const validateUser = async () => {
    // TODO: Move this to a common logic and Toast the error message
    try {
      const { data } = await axios.get('/validate');
      setUser(data);
      setTokensInitialized(true);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        toast.error('You are not authorized! Kindly contact admin!');
      }
    }
  };

  return (
    <SSRKeycloakProvider
      persistor={SSRCookies(cookies)}
      keycloakConfig={keycloakConfig}
      onTokens={handleTokens}
      initOptions={{
        pkceMethod: 'S256',
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      }}
    >
      <StrictMode>
        <AuthProvider tokensInitialized={tokensInitialized} user={user}>
          <Head>
            <title>BC - Programs Branch Grant Programs</title>
            <link rel='icon' href='/assets/img/bc_favicon.ico' />
          </Head>
          <div className='h-full flex flex-col'>
            <Header />
            <main className='flex-grow flex justify-center bg-bcLightBackground'>
              <div className=' w-full xl:w-layout mb-12'>
                <Component {...pageProps} />
              </div>
            </main>
            <Footer />
          </div>
          <ToastContainer
            style={{ width: '30%', maxWidth: '675px' }}
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
          />
        </AuthProvider>
      </StrictMode>
    </SSRKeycloakProvider>
  );
}

export default App;
