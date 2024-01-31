/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';

import useOnScreen from 'src/hooks/useOnScreen';

import { BoxMui, TextButton, TypographyDescription, TypographyWhite } from './styles';

export const Footer = ({ onFooterIsShowed }: { onFooterIsShowed?: (value: boolean) => void }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  useEffect(() => {
    onFooterIsShowed?.(isVisible);
  }, [isVisible, onFooterIsShowed]);

  return (
    <BoxMui ref={ref}>
      <TypographyWhite variant="h2">Startup 3</TypographyWhite>
      <TypographyDescription>
        Startup Framework contains components and complex blocks which can easily be integrated into almost any design.
      </TypographyDescription>
      <div style={{ display: 'flex' }}>
        <TextButton>Privacy Policy</TextButton>
        <TextButton>Terms</TextButton>
      </div>
    </BoxMui>
  );
};
