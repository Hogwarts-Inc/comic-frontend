import React from 'react';

import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';

import { Box, Content, TypographyDescription } from './styles';

export function Explore() {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Box>
        <Content>
          <TypographyDescription variant="h3">{t('explore.title')}</TypographyDescription>
          <Button variantType="gradient" size="large" onClick={() => console.log('Page not available')}>
            {t('explore.buttonText')}
          </Button>
        </Content>
      </Box>
    </Grid>
  );
}
