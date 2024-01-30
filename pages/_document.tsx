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
