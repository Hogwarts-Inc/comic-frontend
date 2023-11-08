import React from 'react';

import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';

import { Box, Content, Description } from './styles';

export function Explore() {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} lg={12}>
        <Box>
          <Content>
            <Description>{t('explore.title')}</Description>
            <Button variantType="gradient" size="large" onClick={() => console.log('Page not available')}>
              {t('explore.buttonText')}
            </Button>
          </Content>
        </Box>
      </Grid>
    </Grid>
  );
}
