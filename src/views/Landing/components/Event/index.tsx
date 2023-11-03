/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';

import { Grid } from '@mui/material';

import { apisEvents, Event as EventType } from 'src/services/apiConfig';

import { GridItemCenter, GridContainer, TypographyDescription, TypographyTitle } from './styles';

export const Event = () => {
  const [eventData, setEvent] = useState<EventType>();
  useEffect(() => {
    apisEvents.getEvent().then(({ data }) => {
      setEvent(data[0]);
    });
  }, []);

  return (
    eventData && (
      <GridContainer container spacing={4}>
        <GridItemCenter item xs={12} md={6} lg={6}>
          <TypographyTitle>Evento</TypographyTitle>
          <br />
          <TypographyDescription>{eventData.descriptions[0].text}</TypographyDescription>
        </GridItemCenter>
        <Grid item xs={12} md={6} lg={6}>
          <img alt="Imagen del evento" src={eventData.image_url} style={{ width: '100%', height: '100%' }} />
        </Grid>
      </GridContainer>
    )
  );
};
