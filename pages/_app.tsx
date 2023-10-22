import React from 'react';

import { AppProps } from 'next/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@styles/styles.css';

import Container from 'src/Container';
import Provider from 'src/Provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
  );
}

export default MyApp;
