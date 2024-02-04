import React from 'react';

import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';

import theme from '@styles/theme';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html
        style={{
          fontSize: theme.breakpoints.down('sm') ? '12px' : theme.breakpoints.between('sm', 'md') ? '14px' : '16px',
        }}>
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
      </Html>
    );
  }
}

export default MyDocument;
