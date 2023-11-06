import React from 'react';

import { Grid } from '@mui/material';
import { styled } from 'baseui';

import Common from './Common';
import Scenes from './Scenes';

const Container = styled(Grid, ({ $theme }: { $theme: { colors: { white: string } } }) => ({
  background: $theme.colors.white,
  width: '100%',
}));

const Graphic = () => (
  <Container>
    <Scenes />
    <Common />
  </Container>
);

export default Graphic;
