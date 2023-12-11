import React from 'react';

import DefaultLayout from '@components/DefaultLayout';
import { HttpStatusCode } from 'src/utils/http-status-codes';
import ErrorComponent from 'src/views/Error';

const NotFoundPage = () => (
  <DefaultLayout>
    <ErrorComponent errorType={HttpStatusCode.NotFound} />
  </DefaultLayout>
);

export default NotFoundPage;
