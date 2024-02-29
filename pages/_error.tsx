import React, { useEffect, useState } from 'react';

import { NextPageContext } from 'next';
import { useSelector } from 'react-redux';

import DefaultLayout from '@components/DefaultLayout';
import { apiUserProfile } from 'src/services/api';
import { RootState } from 'src/store/rootReducer';
import { HttpStatusCode } from 'src/utils/http-status-codes';
import ErrorComponent from 'src/views/Error';

interface ErrorProps {
  statusCode: HttpStatusCode;
}

const ErrorPage = ({ statusCode }: ErrorProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    if (token) {
      (async () => {
        const { data } = await apiUserProfile.getUserProfile({ token });
        setProfilePicture(data.image_url);
      })();
    }
  }, [token]);

  return (
    <DefaultLayout profilePicture={profilePicture} accessToken={token}>
      <ErrorComponent errorType={statusCode} />
    </DefaultLayout>
  );
};

ErrorPage.getInitialProps = ({ res, err, query }: NextPageContext) => {
  let statusCode = HttpStatusCode.InternalServerError;

  if (res || err) {
    statusCode = (res || err)?.statusCode as HttpStatusCode;
  } else if (query.statusCode) {
    const queryStatusCode = parseInt(query.statusCode as string, 10);
    if (Object.values(HttpStatusCode).includes(queryStatusCode)) {
      statusCode = queryStatusCode as HttpStatusCode;
    }
  }

  return { statusCode };
};

export default ErrorPage;
