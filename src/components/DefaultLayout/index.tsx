import React, { ReactNode } from 'react';
import { Grid } from '@mui/material';
import { TopBar } from '@components/TopBar';
import { Footer } from '@components/Footer';
import { LayoutContainer, StyledContainer, StyledTextureBackground } from './styles';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <LayoutContainer>
    <StyledTextureBackground />
    <StyledContainer maxWidth={false} disableGutters>
      <Grid container direction="column" spacing={2} style={{ flex: 1 }} justifyContent="center">
        <Grid item>
          <TopBar isAuthenticated={false} />
        </Grid>
        <Grid item xs={12} style={{ flex: 1 }}>
          {children}
        </Grid>
        <Grid item container justifyContent="center">
          <Footer />
        </Grid>
      </Grid>
    </StyledContainer>
  </LayoutContainer>
);

export default DefaultLayout;
