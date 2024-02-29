import React from 'react';

import { getAccessToken } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

import ChapterPreviewer from '@components/ChaptersPreview';
import DefaultLayout from '@components/DefaultLayout';
import { apiUserProfile } from 'src/services/api';

interface ChapterProps {
  accessToken: string;
  profilePicture: string;
}

export const getServerSideProps = (async ctx => {
  let accessToken = '';
  let profilePicture = '';
  try {
    accessToken = (await getAccessToken(ctx.req, ctx.res)).accessToken || '';
  } catch (e) {
    console.error('Error fetching access token:', e);
  }
  try {
    const { data } = await apiUserProfile.getUserProfile({ token: accessToken });
    profilePicture = data.image_url;
  } catch (e) {
    console.error('Error fetching images:', e);
  }
  return { props: { accessToken, profilePicture } };
}) satisfies GetServerSideProps<ChapterProps>;

export default ({ accessToken, profilePicture }: ChapterProps) => (
  <DefaultLayout profilePicture={profilePicture} accessToken={accessToken}>
    <ChapterPreviewer />
  </DefaultLayout>
);
