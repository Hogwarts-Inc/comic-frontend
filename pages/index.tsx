import React from 'react';

import { Grid } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { useInView } from 'react-intersection-observer';

import DefaultLayout from '@components/DefaultLayout';
import { Characters } from 'src/views/Landing/components/Characters';
import { Event } from 'src/views/Landing/components/Event';
import { Explore } from 'src/views/Landing/components/Explore';
import { MainComic } from 'src/views/Landing/components/MainComic';

const Home = () => {
  const [mainComicRef] = useInView();
  const [exploreRef] = useInView();
  const [charactersRef] = useInView();
  const [eventRef] = useInView();

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

export default Home;
