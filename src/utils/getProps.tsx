import { getAccessToken } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

import { apiUserProfile } from 'src/services/api';

export interface BasicProps {
  accessToken: string;
  profilePicture: string;
}

export const getProps = (async ctx => {
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
}) satisfies GetServerSideProps<BasicProps>;
