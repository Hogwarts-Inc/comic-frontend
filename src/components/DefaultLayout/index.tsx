import React, { ReactNode } from 'react';

import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import { Footer } from '@components/Footer';
import { TopBar } from '@components/TopBar';
import { RootState } from 'src/store/rootReducer';

import { LayoutContainer } from './styles';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  return (
    <LayoutContainer container direction="column">
      <Grid item>
        <TopBar isAuthenticated={isAuthenticated} />
      </Grid>
      <Grid container xs item overflow="scroll" justifyContent="center">
        {children}
        <Footer />
      </Grid>
    </LayoutContainer>
  );
};

export default DefaultLayout;
