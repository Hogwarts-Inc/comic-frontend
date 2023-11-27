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
import Container from 'src/Container';
import Provider from 'src/Provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default MyApp;
