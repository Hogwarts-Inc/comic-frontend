import React from 'react';

import { styled } from '@mui/material';
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';

const StyledHtml = styled(Html)(({ theme }) => ({
  fontSize: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '14px',
  },
}));

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <StyledHtml>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content="Sumate a la historieta colaborativa más larga del mundo" />
          <title>La historieta más larga del mundo</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </StyledHtml>
    );
  }
}

export default MyDocument;
