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

ErrorPage.getInitialProps = ({ res, err, query }: NextPageContext) => {
  let statusCode = HttpStatusCode.InternalServerError;

  if (res) {
    statusCode = res.statusCode as HttpStatusCode;
  } else if (err) {
    statusCode = err.statusCode as HttpStatusCode;
  } else if (query.statusCode) {
    const queryStatusCode = parseInt(query.statusCode as string, 10);
    if (Object.values(HttpStatusCode).includes(queryStatusCode)) {
      statusCode = queryStatusCode as HttpStatusCode;
    }
  }

  return { statusCode };
};

export default ErrorPage;
