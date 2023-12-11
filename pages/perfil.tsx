import React from 'react';

import DefaultLayout from '@components/DefaultLayout';
import MyProfile from 'src/views/MyProfile';

function Profile() {
  return (
    <DefaultLayout>
      <MyProfile />
    </DefaultLayout>
  );
}

export default Profile;
