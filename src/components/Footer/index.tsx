import React from 'react';

import { BoxContainer, BoxMui, TextButton, TypographyDescription, TypographyWhite } from './styles';

export const Footer = () => (
  <BoxMui>
    <BoxContainer>
      <TypographyWhite variant="h2">Startup 3</TypographyWhite>
      <TypographyDescription>
        Startup Framework contains components and complex blocks which can easily be integrated into almost any design.
      </TypographyDescription>
      <TextButton>Privacy Policy</TextButton>
      <TextButton>Terms</TextButton>
    </BoxContainer>
  </BoxMui>
);
