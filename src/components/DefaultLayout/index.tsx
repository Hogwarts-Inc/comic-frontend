import React, { ReactNode } from 'react';

import { Grid } from '@mui/material';

import { Footer } from '@components/Footer';
import { TopBar } from '@components/TopBar';

import { LayoutContainer, StyledContainer, StyledGrid, StyledTextureBackground } from './styles';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <LayoutContainer>
    <StyledTextureBackground />
    <StyledContainer maxWidth={false} disableGutters>
      <StyledGrid container spacing={2}>
        <Grid item>
          <TopBar isAuthenticated={false} />
        </Grid>
        <Grid item style={{ flex: 1 }}>
          {children}
        </Grid>
        <Grid item container justifyContent="center">
          <Footer />
        </Grid>
      </StyledGrid>
    </StyledContainer>
  </LayoutContainer>
);

export default DefaultLayout;
