import React, { useEffect, useState, JSX } from 'react';

import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

import { Carousel } from '@components/Carousel';
import { apisCanvas } from 'src/services/apiConfig';

import { MainComicGrid, TypographyTitle } from './styles';

interface ImageObj {
  image_url: string;
}

export const MainComic = (): JSX.Element => {
  const { t } = useTranslation();

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchCanva = async () => {
      try {
        const response = await apisCanvas.getCanva();
        const imageUrls = response.data.map((obj: ImageObj) => obj.image_url);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching canvas:', error);
      }
    };

    fetchCanva();
  }, []);

  return (
    <MainComicGrid container>
      <Grid item xs={12} lg={12}>
        <TypographyTitle variant="h2">{t('mainComic.title')}</TypographyTitle>
      </Grid>
      <Grid item xs={12} lg={8}>
        <Carousel images={images} />
      </Grid>
    </MainComicGrid>
  );
};
