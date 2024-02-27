import { getAccessToken } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

import { apiUserProfile, apisCanvas } from 'src/services/api';
import Visualizer, { VisualizerProps } from 'src/views/Visualizer';

export const getServerSideProps = (async context => {
  let data: VisualizerProps = {
    image: '',
    username: '',
    profilePicture: '',
    comments: [],
    likes: 0,
    currentUserLikes: false,
    accessToken: '',
    currentUserProfilePicture: '',
    currentUserUsername: '',
    walletAddress: '',
    tokenId: '',
    transferred: false,
  };
  let accessToken = '';
  try {
    accessToken = (await getAccessToken(context.req, context.res)).accessToken || '';
  } catch (e) {
    console.error('Error fetching access token:', e);
  }
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=30');
  if (context.query.vignette) {
    try {
      const { data: dataApi } = await apisCanvas.getCanvaById({ token: accessToken, canvaId: +context.query.vignette });
      const image = (await fetch(dataApi.image_url)).url;
      data = {
        image,
        comments: dataApi.comments.map(comment => ({
          comment: comment.text,
          profilePicture: comment.user_attributes.image_url,
          username: comment.user_attributes.name,
          id: `${comment.id}`,
        })),
        walletAddress: dataApi.nft_data.wallet_address,
        tokenId: dataApi.nft_data.token_id,
        transferred: dataApi.nft_data.transferred,
        username: dataApi.user_attributes.name,
        profilePicture: dataApi.user_attributes.image_url,
        likes: dataApi.likes,
        currentUserLikes: dataApi.current_user_likes,
        accessToken,
        currentUserUsername: '',
        currentUserProfilePicture: '',
      };
    } catch (e) {
      console.error('Error fetching data:', e);
    }
    try {
      const { data: userApi } = await apiUserProfile.getUserProfile({ token: accessToken });
      data = { ...data, currentUserUsername: userApi.name, currentUserProfilePicture: userApi.image_url };
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  }

  return { props: data };
}) satisfies GetServerSideProps<VisualizerProps>;

export default Visualizer;
