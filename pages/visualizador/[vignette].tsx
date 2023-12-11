/* eslint-disable react/destructuring-assignment */

import { getAccessToken } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

import { apisCanvas } from 'src/services/apiConfig';
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
  };
  let accessToken = '';
  try {
    accessToken = (await getAccessToken(context.req, context.res)).accessToken || '';
  } catch (e) {
    console.log(e);
  }
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=30');
  if (context.query.vignette) {
    try {
      const { data: dataApi } = await apisCanvas.getCanvaById(+context.query.vignette);
      data = {
        image: dataApi.image_url,
        comments: dataApi.comments,
        username: dataApi.user_attributes.name,
        profilePicture: dataApi.user_attributes.picture,
        likes: dataApi.likes,
        currentUserLikes: false,
        accessToken,
      };
    } catch (e) {
      console.log(e);
    }
  }

  return { props: data };
}) satisfies GetServerSideProps<VisualizerProps>;

export default Visualizer;
