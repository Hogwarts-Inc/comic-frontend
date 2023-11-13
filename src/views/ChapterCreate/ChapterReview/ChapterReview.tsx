import React from 'react';

import { useTranslation } from 'react-i18next';

import Button from '@components/Button';

import { Title, GridContainer, SectionTitle, SectionDescription, Thumbnail, ThumbnailContainer } from './styles';
import { Grid } from '@mui/material';

interface ChapterReviewProps {
  onNext: () => void;
  values: {
    title: string;
    description: string;
    files: File[];
  };
}

export const ChapterReview = ({
  onNext,
  values,
}: ChapterReviewProps) => {
  const { t } = useTranslation();

  const createObjectURL = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <GridContainer container >
      <Grid item xs={12}>
        <Title>{t('chapterCreate.title')}</Title>
      </Grid>

      <Grid item xs={12}>
        <SectionTitle>{t('common.title')}</SectionTitle>
        <SectionDescription>{values.title}</SectionDescription>
      </Grid>

      <Grid item xs={12}>
        <SectionTitle>{t('common.description')}</SectionTitle>
        <SectionDescription>{values.description}</SectionDescription>
      </Grid>

      <Grid item xs={12}>
        <SectionTitle>{t('chapterCreate.chapterReview.createdCanvas')}</SectionTitle>
        <ThumbnailContainer>
          {values.files.map((file, index) => (
            <Thumbnail key={index} src={createObjectURL(file)} alt={`image-${index}`} />
          ))}
        </ThumbnailContainer>
      </Grid>

      <Button
        style={{ marginBottom: '4rem' }}
        variantType="gradient"
        size="large"
        onClick={onNext}
      >
        {t('chapterCreate.chapterReview.publishButton')}
      </Button>
    </GridContainer >
  );
}
