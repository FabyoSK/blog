import React from 'react';
import { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/global.scss';
import { PrismicProvider } from '@prismicio/react';

import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <PrismicProvider>
        <Header />
        <Component {...pageProps} />
      </PrismicProvider>
    </SessionProvider>
  );
}

export default MyApp;
