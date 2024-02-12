/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppProps } from 'next/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@styles/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Client, Server } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

import Container from 'src/Container';
import Provider from 'src/Provider';

const getHydrateClass = () => document.getElementsByClassName('_styletron_hydrate_');

const engine =
  typeof window === 'undefined'
    ? new Server()
    : new Client({
        hydrate: getHydrateClass() as any,
      });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyletronProvider value={engine}>
      <UserProvider>
        <Provider>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Container>
            <Component {...pageProps} />
          </Container>
        </Provider>
      </UserProvider>
    </StyletronProvider>
  );
}

export default MyApp;
