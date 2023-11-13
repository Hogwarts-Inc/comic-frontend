import React from 'react';

import { useTranslation } from 'react-i18next';

import Button from '@components/Button';

import { Title, GridContainer, TitleTextField, DescriptionTextField } from './styles';
import { Grid } from '@mui/material';

interface AddInfoProps {
  onNext: () => void;
}

export const AddInfo = ({ onNext }: AddInfoProps) => {
  const { t } = useTranslation();

  return (
    <GridContainer container >
      <Grid item xs={12}>
        <Title>{t('chapterCreate.title')}</Title>
      </Grid>

      <Grid item xs={12}>
        <TitleTextField
          id="title"
          variant="outlined"
          label={t('common.title')}
        />
      </Grid>

      <Grid item xs={12}>
        <DescriptionTextField
          maxRows={10}
          minRows={10}
          multiline
          id="description"
          variant="outlined"
          label={t('common.description')} />
      </Grid>

      <Button
        style={{ marginBottom: '4rem' }}
        variantType="gradient"
        size="large"
        onClick={onNext}
      >
        {t('common.next')}
      </Button>
    </GridContainer >
  );
}
