import React, { useState, useEffect } from 'react';

import { Grid } from '@mui/material';

import { apisCharacter, Character as CharacterType } from 'src/services/apiConfig';

import { GridItemCenter, GridContainer, TypographyDescription, TypographyTitle } from './styles';

export const Event = () => {
  const [characterData, setCharacter] = useState<CharacterType>();
  useEffect(() => {
    apisCharacter.getCharacters().then(({ data }) => {
      setCharacter(data[0]);
    });
  }, []);

  return (
    characterData && (
      <GridContainer container spacing={4}>
        <GridItemCenter item xs={12} md={6} lg={6}>
          <TypographyTitle>Evento</TypographyTitle>
          <br />
          <TypographyDescription>{characterData.descriptions[0].text}</TypographyDescription>
        </GridItemCenter>
        <Grid item xs={12} md={6} lg={6}>
          <img alt="Imagen del evento" src={characterData.image_url} style={{ width: '100%', height: '100%' }} />
        </Grid>
      </GridContainer>
    )
  );
};
