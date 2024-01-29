/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { getAccessToken } from '@auth0/nextjs-auth0';
import { Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import { Fade } from 'react-awesome-reveal';
import { useInView } from 'react-intersection-observer';

import DefaultLayout from '@components/DefaultLayout';
import useAppAuthentication from 'src/hooks/useAppAuthentication';
import { Characters } from 'src/views/Landing/components/Characters';
import { Event } from 'src/views/Landing/components/Event';
import { Explore } from 'src/views/Landing/components/Explore';
import { MainComic } from 'src/views/Landing/components/MainComic';

export const getServerSideProps = (async ctx => {
  let accessToken = '';
  try {
    accessToken = (await getAccessToken(ctx.req, ctx.res)).accessToken || '';
  } catch (e) {
    console.error('Error fetching access token:', e);
  }
  return { props: { accessToken } };
}) satisfies GetServerSideProps<{ accessToken: string }>;

const Home = ({ accessToken }: { accessToken: string }) => {
  const [mainComicRef] = useInView();
  const [exploreRef] = useInView();
  const [charactersRef] = useInView();
  const [eventRef] = useInView();
  useAppAuthentication(accessToken);

  return (
    <DefaultLayout>
      <Grid container item gap="32rem" xs direction="column" alignItems="center">
        <Grid container item ref={mainComicRef}>
          <Fade direction="up" triggerOnce={false}>
            <MainComic />
          </Fade>
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
