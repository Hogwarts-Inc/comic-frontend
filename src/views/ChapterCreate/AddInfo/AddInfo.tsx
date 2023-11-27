/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React from 'react';

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Title, GridContainer, TitleTextField, DescriptionTextField, NextButton } from './styles';

interface AddInfoProps {
  errors: {
    title?: string;
    description?: string;
  };
  isValidating: boolean;
  isSubmitting: boolean;
  touched: {
    title?: boolean;
    description?: boolean;
  };
  values: {
    title: string;
    description: string;
  };
  handleBlur: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  validateField: (field: string) => void;
  onNext: () => void;
}

export const AddInfo = ({
  errors,
  isValidating,
  isSubmitting,
  touched,
  values,
  handleBlur,
  handleChange,
  validateField,
  onNext,
}: AddInfoProps) => {
  const { t } = useTranslation();

  const handleFieldChange = (e: React.ChangeEvent<any>) => {
    handleChange(e);
    validateField(e.target.name);
  };

  return (
    <GridContainer container>
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
          onChange={handleFieldChange}
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
          onChange={handleFieldChange}
          onBlur={handleBlur}
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
        />
      </Grid>

      <NextButton
        variantType="gradient"
        size="large"
        onClick={onNext}
        disabled={isValidating || isSubmitting}>
        {t('common.next')}
      </NextButton>
    </GridContainer>
  );
};
