/* eslint-disable indent */
import { getAccessToken } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

import { apiUserProfile, apisCanvas } from 'src/services/api';
import Visualizer, { VisualizerProps } from 'src/views/Visualizer';

export const getServerSideProps = (async context => {
  const nftEnabled = process.env.NEXT_PUBLIC_NFT_TOGGLE === 'true';

  let data: VisualizerProps = {
    image: '',
    username: '',
    profilePicture: '',
    comments: [],
    likes: 0,
    currentUserLikes: false,
    accessToken: '',
    currentUserUsername: '',
    currentUserProfilePicture: '',
    ...(nftEnabled
      ? {
          walletAddress: '',
          tokenId: '',
          transferred: false,
        }
      : {}),
    url: '',
    isOwner: false,
  };
  let userID1;

  let accessToken = '';
  try {
    accessToken = (await getAccessToken(context.req, context.res)).accessToken || '';
  } catch (e) {
    console.error('Error fetching access token:', e);
  }

  if (context.query.vignette) {
    try {
      const { data: dataApi } = await apisCanvas.getCanvaById({ token: accessToken, canvaId: +context.query.vignette });
      const image = (await fetch(dataApi.image_url)).url;
      userID1 = dataApi.user_attributes.id;
      data = {
        ...data,
        image,
        comments: dataApi.comments.map(comment => ({
          comment: comment.text,
          profilePicture: comment.user_attributes.image_url,
          username: comment.user_attributes.name,
          id: `${comment.id}`,
        })),
        username: dataApi.user_attributes.name,
        profilePicture: dataApi.user_attributes.image_url,
        likes: dataApi.likes,
        currentUserLikes: dataApi.current_user_likes,
        accessToken,
        currentUserUsername: '',
        currentUserProfilePicture: '',
        ...(nftEnabled
          ? {
              walletAddress: dataApi.nft_data.wallet_address,
              tokenId: dataApi.nft_data.token_id,
              transferred: dataApi.nft_data.transferred,
            }
          : {}),
        url: `${process.env.NEXT_PUBLIC_BASE_URL}${context.resolvedUrl}` || '',
      };
    } catch (e) {
      console.error('Error fetching data:', e);
    }

    try {
      const { data: userApi } = await apiUserProfile.getUserProfile({ token: accessToken });
      data = {
        ...data,
        currentUserUsername: userApi.name,
        currentUserProfilePicture: userApi.image_url,
        isOwner: userApi.id === userID1,
      };
    } catch (e) {
      console.error('Error fetching user profile:', e);
    }
  }

  return { props: data };
}) satisfies GetServerSideProps<VisualizerProps>;

export default Visualizer;
