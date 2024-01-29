import React from 'react';

import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';
import { Route } from 'src/constants/routes';

import { Box, Content, TypographyDescription } from './styles';

export function Explore() {
  const { t } = useTranslation();
  const { push } = useRouter();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Box>
        <Content>
          <TypographyDescription variant="h3">{t('explore.title')}</TypographyDescription>
          <Button variantType="gradient" size="large" onClick={() => push(Route.chapter)}>
            {t('explore.buttonText')}
          </Button>
        </Content>
      </Box>
    </Grid>
  );
}
