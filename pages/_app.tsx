import '@styles/styles.css';
import { ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import '@styles/styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Container from 'src/Container';
import Provider from 'src/Provider';

import theme from '../src/styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider>
    <ThemeProvider theme={theme}>
    <Container>
      <Component {...pageProps} />
    </Container>
    </ThemeProvider>
    
  </Provider>
);

export default MyApp;
