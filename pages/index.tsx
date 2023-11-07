import React from 'react';
import { MainComic } from 'src/views/Landing/components/MainComic';
import { Explore } from 'src/views/Landing/components/Explore';
import DefaultLayout from '@components/DefaultLayout';
import { Grid } from '@mui/material';
import { Event } from 'src/views/Landing/components/Event';
import { Characters } from 'src/views/Landing/components/Characters';

const Home = () => {

  return (
    <DefaultLayout
      children={
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
      }
    />
  );
};

export default Home;
