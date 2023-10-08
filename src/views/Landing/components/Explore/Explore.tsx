import React from 'react';

import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Button from '@components/Button';

import { Box, Placeholder, Content, Description } from './styles';

const texts = {
  description: 'Empeza a explorar otros capitulos y crear tus propias historias',
  button: 'Lorem',
};

export const Explore = (): JSX.Element => {
  const theme = useTheme();
  const isXSScreen = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Grid container>
      <Grid item xs={12} lg={8}>
        <Box>
          <Placeholder lg={!isXSScreen} />
          <Content lg={!isXSScreen}>
            <Description lg={!isXSScreen}>{texts.description}</Description>
            <Button />
          </Content>
        </Box>
      </Grid>
    </Grid>
  );
};
