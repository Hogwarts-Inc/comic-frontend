import React, { ReactNode } from 'react';

import { Grid } from '@mui/material';

import { Footer } from '@components/Footer';
import { TopBar } from '@components/TopBar';

import { ChildContainer, ContentContainer, LayoutContainer } from './styles';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <LayoutContainer container direction="column">
    <Grid item>
      <TopBar />
    </Grid>
    <Grid container xs item overflow="scroll" justifyContent="center">
      <ContentContainer>
        <ChildContainer>{children}</ChildContainer>
        <Footer />
      </ContentContainer>
    </Grid>
  </LayoutContainer>
);

export default DefaultLayout;
