import React from 'react';

import DefaultLayout from '@components/DefaultLayout';
import withAuth from 'src/hoc/withAuth';
import { BasicProps, getProps } from 'src/utils/getProps';
import MyProfile from 'src/views/MyProfile';

export const getServerSideProps = getProps;

const Profile = ({ profilePicture, accessToken }: BasicProps) => (
  <DefaultLayout profilePicture={profilePicture} accessToken={accessToken}>
    <MyProfile />
  </DefaultLayout>
);

export default withAuth(Profile);
