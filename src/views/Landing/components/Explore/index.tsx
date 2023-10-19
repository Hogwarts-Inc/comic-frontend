import React from 'react';

import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';

import { Box, Placeholder, Content, Description } from './styles';

export const Explore = (): JSX.Element => {
  const theme = useTheme();
  const isXSScreen = useMediaQuery(theme.breakpoints.only('xs'));

  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item xs={12} lg={8}>
        <Box>
          <Placeholder lg={!isXSScreen} />
          <Content lg={!isXSScreen}>
            <Description lg={!isXSScreen}> {t('explore.title')}</Description>
            <Button variantType="gradient" size="large">
              Lorem
            </Button>
          </Content>
        </Box>
      </Grid>
    </Grid>
  );
};
