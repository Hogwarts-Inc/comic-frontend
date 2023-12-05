/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useMemo } from 'react';

import { CircularProgress, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { apisEvents, Event as EventType } from 'src/services/apiConfig';

import { GridItemCenter, GridContainer, TypographyDescription, TypographyTitle } from './styles';

export const Event = () => {
  const { t } = useTranslation();
  const [eventData, setEventData] = useState<EventType>();

  useEffect(() => {
    apisEvents.getEvent().then(({ data }) => {
      setEventData(data[0]);
    });
  }, []);

  const descriptionText = useMemo(
    () => eventData?.descriptions?.[0]?.text ?? t('event.descriptionUnavailable'),
    [eventData?.descriptions, t],
  );

  if (!eventData) {
    return <CircularProgress />;
  }

  return (
    <GridContainer container spacing={4}>
      <GridItemCenter item xs={12} md={6} lg={6}>
        <TypographyTitle variant="h2">{t('event.title')}</TypographyTitle>
        <br />
        <TypographyDescription variant="h4">{descriptionText}</TypographyDescription>
      </GridItemCenter>
      <Grid item xs={12} md={6} lg={6}>
        <img alt="Imagen del evento" src={eventData.image_url} style={{ width: '100%', height: '100%' }} />
      </Grid>
    </GridContainer>
  );
};
