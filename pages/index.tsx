/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import { Fade } from 'react-awesome-reveal';
import { useInView } from 'react-intersection-observer';

import DefaultLayout from '@components/DefaultLayout';
import { apisCanvas } from 'src/services/api';
import { BasicProps, getProps } from 'src/utils/getProps';
import { Characters } from 'src/views/Landing/components/Characters';
import { Event } from 'src/views/Landing/components/Event';
import { Explore } from 'src/views/Landing/components/Explore';
import { Images, MainComic } from 'src/views/Landing/components/MainComic';

interface HomeProps extends BasicProps {
  images: Images[];
}
export const getServerSideProps = (async ctx => {
  const {
    props: { accessToken, profilePicture },
  } = await getProps(ctx);
  let images: Images[] = [];

  try {
    const { data } = await apisCanvas.getCanva();
    images = data.map(obj => ({ url: obj.image_url, id: obj.id }));
  } catch (e) {
    console.error('Error fetching images:', e);
  }
  return { props: { accessToken, images, profilePicture } };
}) satisfies GetServerSideProps<HomeProps>;

const Home = ({ accessToken, images, profilePicture }: HomeProps) => {
  const [mainComicRef] = useInView();
  const [exploreRef] = useInView();
  const [charactersRef] = useInView();
  const [eventRef] = useInView();

  return (
    <DefaultLayout profilePicture={profilePicture} accessToken={accessToken}>
      <Grid container item gap="20rem" xs direction="column" alignItems="center">
        <Grid container item ref={mainComicRef}>
          <MainComic images={images} />
        </Grid>
        <Grid container item ref={exploreRef}>
          <Fade style={{ width: '100%' }} direction="right" triggerOnce={false}>
            <Explore />
          </Fade>
        </Grid>
        <Grid container item ref={charactersRef}>
          <Fade style={{ width: '100%' }} direction="left" triggerOnce={false}>
            <Characters />
          </Fade>
        </Grid>
        <Grid container item ref={eventRef}>
          <Fade style={{ width: '100%' }} direction="right" triggerOnce={false}>
            <Event />
          </Fade>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default Home;
