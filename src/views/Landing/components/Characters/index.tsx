import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { CircularProgress, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { Carousel } from '@components/Carousel';
import { apisCharacter } from 'src/services/apiConfig';
import { RootState } from 'src/store/rootReducer';

import { GridContainer, TypographyDescription, TypographyTitle, TypographyName, GridItemCenter } from './styles';

export const Characters = () => {
  const dispatch = useDispatch();
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
    if (characters.length === 0) {
      apisCharacter.getCharacters().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [characters.length, dispatch]);

  const images = useMemo(() => characters.map(character => character.images[0].url), [characters]);
  const currentCharacter = useMemo(() => characters[currentCharacterIndex], [characters, currentCharacterIndex]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <GridContainer container spacing={2}>
      <Grid item xs={12}>
        <TypographyTitle variant="h3">{t('characters.title')}</TypographyTitle>
      </Grid>

      <GridItemCenter item xs={12}>
        <TypographyName variant="h1">{currentCharacter.name}</TypographyName>
      </GridItemCenter>

      <Grid item xs={2} sm={3} md={4} lg={4} xl={4} />

      <GridItemCenter item xs={8} sm={6} md={4} lg={4} xl={4}>
        <Carousel images={images} displayMode="reduced" setCurrentIndex={updateCurrentCharacterIndex} />
      </GridItemCenter>

      <Grid item xs={2} sm={3} md={4} lg={4} xl={4} />

      <GridItemCenter item xs={12}>
        {currentCharacter.descriptions.map(description => (
          <TypographyDescription variant="h4" key={description.id}>{description.text}</TypographyDescription>
        ))}
      </GridItemCenter>
    </GridContainer>
  );
};
