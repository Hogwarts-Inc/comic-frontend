import React from 'react';
import { Button } from 'baseui/button';
import { useRouter } from 'next/router';
import { Route } from 'src/constants/routes';
import { MainComic } from 'src/views/Landing/components/MainComic';
import { Explore } from 'src/views/Landing/components/Explore';
import DefaultLayout from '@components/DefaultLayout';
import { Grid } from '@mui/material';


const Home = () => {
  const { push } = useRouter();

  return (

    <DefaultLayout children={
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>Inicio</Grid>
        <Grid item><MainComic /></Grid>
        {/* <Grid item><Explore /></Grid> */}
        <Grid item>
          <Button onClick={() => push(Route.editor)}>Editor</Button>
          <Button onClick={() => push(Route.profile)}>Perfil</Button>
          <Button onClick={() => push(`${Route.visualizer}/1/1`)}>Visualizar</Button>
        </Grid>
      </Grid>
    } />
  )
};

export default Home;
