import { AppProps } from 'next/app';
import '@styles/styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Container from 'src/Container';
import Provider from 'src/Provider';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider>
    <Container>
      <Component {...pageProps} />
    </Container>
  </Provider>
);

export default MyApp;
