import '../styles/globals.css';

import Head from 'next/head';

import type { AppProps } from 'next/app';
import { Footer, Header } from '@components';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BC - Programs Branch Grant Programs</title>
        <link rel='icon' href='/assets/img/bc_favicon.ico' />
      </Head>
      <div className='h-full flex flex-col'>
        <Header />
        <main className='flex-grow flex justify-center'>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
