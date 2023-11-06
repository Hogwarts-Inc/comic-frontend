import React from 'react';
import { Button } from 'baseui/button';
import { useRouter } from 'next/router';
import { Route } from 'src/constants/routes';
import { MainComic } from 'src/views/Landing/components/MainComic';
import { Explore } from 'src/views/Landing/components/Explore';
import DefaultLayout from '@components/DefaultLayout';
import { Grid } from '@mui/material';
import { Event } from 'src/views/Landing/components/Event';

const Home = () => {
  const { push } = useRouter();

  return (
    <DefaultLayout
      children={
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <MainComic />
          </Grid>
          <Grid item>
            <Event />
          </Grid>
          <Grid item>
            <Explore />
          </Grid>
        </Grid>
      }
    />
  );
};

export default Home;
