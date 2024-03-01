/* eslint-disable no-unused-vars */
import React, { ReactNode } from 'react';

import { Grid } from '@mui/material';

import { Footer } from '@components/Footer';
import { TopBar } from '@components/TopBar';
import useAppAuthentication from 'src/hooks/useAppAuthentication';

import { ChildContainer, ContentContainer, LayoutContainer } from './styles';

interface DefaultLayoutProps {
  children: ReactNode;
  disableFooter?: boolean;
  onFooterIsShowed?: (value: boolean) => void;
  profilePicture: string;
  accessToken: string;
}

const DefaultLayout = ({
  children,
  disableFooter = false,
  onFooterIsShowed,
  profilePicture,
  accessToken,
}: DefaultLayoutProps) => {
  useAppAuthentication(accessToken);

  return (
    <LayoutContainer container direction="column">
      <Grid item>
        <TopBar profilePicture={profilePicture} accessToken={accessToken} />
      </Grid>
      <Grid container xs item overflow="scroll" justifyContent="center">
        <ContentContainer>
          <ChildContainer>{children}</ChildContainer>
          {!disableFooter && <Footer onFooterIsShowed={onFooterIsShowed} />}
        </ContentContainer>
      </Grid>
    </LayoutContainer>
  );
};

export default DefaultLayout;
