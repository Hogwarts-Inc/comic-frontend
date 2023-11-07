import React from 'react';

import { Grid } from '@mui/material';

import DefaultLayout from '@components/DefaultLayout';
import { Characters } from 'src/views/Landing/components/Characters';
import { Event } from 'src/views/Landing/components/Event';
import { Explore } from 'src/views/Landing/components/Explore';
import { MainComic } from 'src/views/Landing/components/MainComic';

const Home = () => (
  <DefaultLayout>
    <Grid container direction="column" alignItems="center" spacing={30}>
      <Grid item>
        <MainComic />
      </Grid>
      <Grid item>
        <Explore />
      </Grid>
      <Grid item>
        <Characters />
      </Grid>
      <Grid item>
        <Event />
      </Grid>
    </Grid>
  </DefaultLayout>
);

export default Home;
