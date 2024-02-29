import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import DefaultLayout from '@components/DefaultLayout';
import { apiUserProfile } from 'src/services/api';
import { RootState } from 'src/store/rootReducer';
import { HttpStatusCode } from 'src/utils/http-status-codes';
import ErrorComponent from 'src/views/Error';

const NotFoundPage = () => {
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
      <ErrorComponent errorType={HttpStatusCode.NotFound} />
    </DefaultLayout>
  );
};

export default NotFoundPage;
