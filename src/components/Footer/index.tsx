import React from 'react';

import { BoxMui, TextButton, TypographyDescription, TypographyWhite } from './styles';

export const Footer = () => (
  <BoxMui>
    <TypographyWhite variant="h2">Startup 3</TypographyWhite>
    <TypographyDescription>
      Startup Framework contains components and complex blocks which can easily be integrated into almost any design.
    </TypographyDescription>
    <TextButton>Privacy Policy</TextButton>
    <TextButton>Terms</TextButton>
  </BoxMui>
);
