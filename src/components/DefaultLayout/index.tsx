import React, { ReactNode } from 'react';
import { Container, Grid } from '@mui/material';
import { TopBar } from '@components/TopBar';
import { Footer } from '@components/Footer';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <Container
    // maxWidth="false"  // This ensures the container takes the full width without any automatic margins.
    disableGutters
    style={{
      height: '100vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      padding: 0
    }}
  >
    <Grid container direction="column" spacing={2} style={{ flex: 1 }} justifyContent="center">
      <Grid item>
        <TopBar isAuthenticated={false} />
      </Grid>
      <Grid item xs={12} style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </Grid>
      <Grid item container justifyContent="center">
        <Footer />
      </Grid>
    </Grid>
  </Container>
);

export default DefaultLayout;
