import React, { ReactNode } from 'react';

import { Grid } from '@mui/material';

import { Footer } from '@components/Footer';
import { TopBar } from '@components/TopBar';

import { LayoutContainer } from './styles';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <LayoutContainer container direction="column">
    <Grid item>
      <TopBar isAuthenticated={false} />
    </Grid>
    <Grid container xs item overflow="scroll" justifyContent="center">
      {children}
    </Grid>
    <Grid item container justifyContent="center">
      <Footer />
    </Grid>
  </LayoutContainer>
);

export default DefaultLayout;
