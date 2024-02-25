import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { CircularProgress, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Carousel } from '@components/Carousel';
import { RootState } from 'src/store/rootReducer';

import {
  GridContainer,
  TypographyDescription,
  TypographyTitle,
  TypographyName,
  GridItemCenter,
  GridItemName,
  GridItemImages,
} from './styles';

export const Characters = () => {
  const { t } = useTranslation();
  const characters = useSelector((state: RootState) => state.resources.characters);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const updateCurrentCharacterIndex = useCallback(
    (newIndex: number) => {
      if (newIndex >= 0 && newIndex < characters.length) {
        setCurrentCharacterIndex(newIndex);
      }
    },
    [characters.length],
  );

  useEffect(() => {
    if (characters.length) {
      setLoading(false);
    }
  }, [characters.length]);

  const images = useMemo(
    () =>
      characters.map(character => ({
        url: character.images[0].url,
      })),
    [characters],
  );
  const currentCharacter = useMemo(() => characters[currentCharacterIndex], [characters, currentCharacterIndex]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <GridContainer container>
      <Grid item xs={12}>
        <TypographyTitle variant="h3">{t('characters.title')}</TypographyTitle>
      </Grid>

      <GridItemName item xs={12}>
        <TypographyName variant="h1">{currentCharacter?.name}</TypographyName>
      </GridItemName>

      <Grid item xs={2} sm={3} md={4} lg={4} xl={4} />

      <GridItemImages item xs={8} sm={6} md={4} lg={4} xl={4}>
        <Carousel images={images} displayMode="reduced" setCurrentIndex={updateCurrentCharacterIndex} />
      </GridItemImages>

      <Grid item xs={2} sm={3} md={4} lg={4} xl={4} />

      <GridItemCenter item xs={12}>
        {currentCharacter?.descriptions.map(description => (
          <TypographyDescription variant="h4" key={description.id}>
            {description.text}
          </TypographyDescription>
        ))}
      </GridItemCenter>
    </GridContainer>
  );
};
