import React from 'react';

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { TitleView } from '@components/AddCanvaTitleView';
import { ContextType } from 'src/interfaces/common';

import { GridContainer, SectionTitle, SectionDescription, Thumbnail, ThumbnailContainer, SubmitButton } from './styles';

interface ChapterReviewProps {
  context: ContextType;
  onNext: () => void;
  values: {
    title?: string;
    description?: string;
    files: string[];
  };
  isSubmitting: boolean;
}

export const DataReview = ({ context, onNext, values, isSubmitting }: ChapterReviewProps) => {
  const { t } = useTranslation();

  return (
    <GridContainer container gap="2rem" padding="2rem">
      <Grid item xs={12}>
        <TitleView context={context} />
      </Grid>

      {context === 'chapter' && (
        <>
          <Grid item xs={12}>
            <SectionTitle variant="h4">{t('common.title')}</SectionTitle>
            <SectionDescription>{values.title}</SectionDescription>
          </Grid>

          <Grid item xs={12}>
            <SectionTitle variant="h4">{t('common.description')}</SectionTitle>
            <SectionDescription>{values.description}</SectionDescription>
          </Grid>
        </>
      )}

      <Grid container item xs={12} gap="1rem" direction="column">
        <SectionTitle variant="h4">{t('chapterCreate.chapterReview.createdCanvas')}</SectionTitle>
        <ThumbnailContainer>
          {values.files.map((file, index) => (
            <Thumbnail key={file} src={file} alt={`image-${index}`} />
          ))}
        </ThumbnailContainer>
      </Grid>

      <SubmitButton isLoading={isSubmitting} size="large" variantType="gradient" onClick={onNext}>
        {t('chapterCreate.chapterReview.publishButton')}
      </SubmitButton>
    </GridContainer>
  );
};
