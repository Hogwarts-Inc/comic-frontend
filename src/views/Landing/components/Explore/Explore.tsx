import React from 'react';

import { Box, Button } from '@mui/material';

import { Placeholder, Content, Description } from './styles';

const texts = {
  description: 'Empeza a explorar otros capitulos y crear tus propias historias',
  button: 'Lorem',
};

export const Explore = (): JSX.Element => (
  <Box>
    <Placeholder />
    <Content>
      <Description>{texts.description}</Description>
      <Button variant="contained">Lorem Impsum</Button>
    </Content>
  </Box>
);
