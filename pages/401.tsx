import React from 'react';

import { HttpStatusCode } from 'axios';

import DefaultLayout from '@components/DefaultLayout';
import ErrorComponent from 'src/views/NotFound';

const ForbiddenPage = () => (
  <DefaultLayout>
    <ErrorComponent errorType={HttpStatusCode.Forbidden} />
  </DefaultLayout>
);

export default ForbiddenPage;
