import React from 'react';

import { styled } from 'baseui';

import Common from './Common';
import Scenes from './Scenes';

const Container = styled('div', ({ $theme }: { $theme: { colors: { white: string } } }) => ({
  background: $theme.colors.white,
}));

function Graphic() {
  return (
    <Container>
      <Scenes />
      <Common />
    </Container>
  );
}

export default Graphic;
