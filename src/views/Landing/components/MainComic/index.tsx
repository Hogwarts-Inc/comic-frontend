import React, { JSX } from 'react';

import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

import { Carousel } from '@components/Carousel';

import { MainComicGrid, TypographyTitle } from './styles';

export type Images = {
  url: string;
  id: number;
};
export const MainComic = ({ images }: { images: Images[] }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <MainComicGrid container>
      <Grid container item xs={12} lg={12} justifyContent="center">
        <TypographyTitle variant="h2">{t('mainComic.title')}</TypographyTitle>
      </Grid>
      <Grid item xs={12} lg={10}>
        <Carousel images={images} />
      </Grid>
    </MainComicGrid>
  );
};
