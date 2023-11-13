import React from 'react';

import { useTranslation } from 'react-i18next';

import Button from '@components/Button';

import { Title, GridContainer, TitleTextField, DescriptionTextField } from './styles';
import { Grid } from '@mui/material';

interface AddInfoProps {
  onNext: () => void;
  values: {
    title: string;
    description: string;
  };
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void; 
  errors: {
    title?: string;
    description?: string;
  };
  touched: {
    title?: boolean;
    description?: boolean;
  };
  isValidating: boolean;
  isSubmitting: boolean;
}

export const AddInfo = ({
  onNext,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  isValidating,
  isSubmitting,
}: AddInfoProps) => {
  const { t } = useTranslation();

  return (
    <GridContainer container >
      <Grid item xs={12}>
        <Title>{t('chapterCreate.title')}</Title>
      </Grid>

      <Grid item xs={12}>
        <TitleTextField
          id="title"
          name="title"
          variant="outlined"
          label={t('common.title')}
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur} 
          error={touched.title && Boolean(errors.title)}
          helperText={touched.title && errors.title}
        />
      </Grid>

      <Grid item xs={12}>
        <DescriptionTextField
          maxRows={10}
          minRows={10}
          multiline
          id="description"
          name="description"
          variant="outlined"
          label={t('common.description')}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
        />
      </Grid>

      <Button
        style={{ marginBottom: '4rem' }}
        variantType="gradient"
        size="large"
        onClick={onNext}
        disabled={isValidating || isSubmitting}
      >
        {t('common.next')}
      </Button>
    </GridContainer >
  );
}
