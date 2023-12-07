import React from 'react';

import { NextPageContext } from 'next';

import DefaultLayout from '@components/DefaultLayout';
import { HttpStatusCode } from 'src/utils/http-status-codes';
import ErrorComponent from 'src/views/Error';

interface ErrorProps {
  statusCode: HttpStatusCode;
}

const ErrorPage = ({ statusCode }: ErrorProps) => (
  <DefaultLayout>
    <ErrorComponent errorType={statusCode} />
  </DefaultLayout>
);

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : HttpStatusCode.InternalServerError;
  return { statusCode };
};

export default ErrorPage;
