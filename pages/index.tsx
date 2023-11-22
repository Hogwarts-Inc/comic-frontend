/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

import { getAccessToken } from '@auth0/nextjs-auth0';
import { Grid } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { useInView } from 'react-intersection-observer';

import DefaultLayout from '@components/DefaultLayout';
import { apisComic } from 'src/services/apiConfig';
import { Characters } from 'src/views/Landing/components/Characters';
import { Event } from 'src/views/Landing/components/Event';
import { Explore } from 'src/views/Landing/components/Explore';
import { MainComic } from 'src/views/Landing/components/MainComic';

const Home = ({ accessToken }: { accessToken: string }) => {
  const [mainComicRef] = useInView();
  const [exploreRef] = useInView();
  const [charactersRef] = useInView();
  const [eventRef] = useInView();

  // TODO remove after test if works on staging
  useEffect(() => {
    apisComic.getStoriettesById(1, accessToken).catch(console.log);
  }, [accessToken]);

  return (
    <DefaultLayout>
      <Grid container direction="column" alignItems="center" spacing={30}>
        <Grid item ref={mainComicRef}>
          <Fade direction="up" triggerOnce={false}>
            <MainComic />
          </Fade>
        </Grid>

        <Grid item ref={exploreRef}>
          <Fade direction="right" triggerOnce={false}>
            <Explore />
          </Fade>
        </Grid>

        <Grid item ref={charactersRef}>
          <Fade direction="left" triggerOnce={false}>
            <Characters />
          </Fade>
        </Grid>

        <Grid item ref={eventRef}>
          <Fade direction="right" triggerOnce={false}>
            <Event />
          </Fade>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export async function getServerSideProps(ctx: any) {
  let accessToken = '';
  try {
    accessToken = (await getAccessToken(ctx.req, ctx.res)).accessToken || '';
  } catch (e) {
    console.log(e);
  }
  return { props: { accessToken } };
}

export default Home;
