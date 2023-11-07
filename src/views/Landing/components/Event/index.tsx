/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';

import { CircularProgress, Grid } from '@mui/material';

import { apisEvents, Event as EventType } from 'src/services/apiConfig';

import { GridItemCenter, GridContainer, TypographyDescription, TypographyTitle } from './styles';

export const Event = () => {
  const [eventData, setEventData] = useState<EventType>();
  useEffect(() => {
    apisEvents.getEvent().then(({ data }) => {
      setEventData(data[0]);
    });
  }, []);

  if (!eventData) {
    return <CircularProgress />;
  }

  const descriptionText = eventData.descriptions?.[0]?.text ?? 'Description not available';

  return (
    eventData && (
      <GridContainer container spacing={4}>
        <GridItemCenter item xs={12} md={6} lg={6}>
          <TypographyTitle>Evento</TypographyTitle>
          <br />
          <TypographyDescription>{descriptionText}</TypographyDescription>
        </GridItemCenter>
        <Grid item xs={12} md={6} lg={6}>
          <img alt="Imagen del evento" src={eventData.image_url} style={{ width: '100%', height: '100%' }} />
        </Grid>
      </GridContainer>
    )
  );
};
