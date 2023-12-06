import React from 'react';

import { HttpStatusCode } from 'axios';

import DefaultLayout from '@components/DefaultLayout';
import ErrorComponent from 'src/views/NotFound';

const NotFoundPage = () => (
  <DefaultLayout>
    <ErrorComponent errorType={HttpStatusCode.NotFound} />
  </DefaultLayout>
);

export default NotFoundPage;
