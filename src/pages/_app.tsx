import React from 'react';
import { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/global.scss';
import { PrismicProvider } from '@prismicio/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider>
      <Header />
      <Component {...pageProps} />
    </PrismicProvider>
  );
}

export default MyApp;
