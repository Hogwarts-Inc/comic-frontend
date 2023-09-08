import '@styles/styles.css';
import { AppProps } from 'next/app';

import Container from 'src/Container';
import Provider from 'src/Provider';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Provider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''} />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet" />
  </>
);

export default MyApp;
