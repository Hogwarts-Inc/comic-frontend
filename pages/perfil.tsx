import React from 'react';

import DefaultLayout from '@components/DefaultLayout';
import withAuth from 'src/hoc/withAuth';
import MyProfile from 'src/views/MyProfile';

function Profile() {
  return (
    <DefaultLayout>
      <MyProfile />
    </DefaultLayout>
  );
}

export default withAuth(Profile);
