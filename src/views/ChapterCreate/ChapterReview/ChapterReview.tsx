import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';

import { Title, GridContainer, SectionTitle, SectionDescription, Thumbnail, ThumbnailContainer } from './styles';

interface ChapterReviewProps {
  onNext: () => void;
  values: {
    title: string;
    description: string;
    files: File[];
  };
}

export const ChapterReview = ({ onNext, values }: ChapterReviewProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const createObjectURL = (file: File) => URL.createObjectURL(file);

  const onPublish = () => {
    setIsLoading(true);
    onNext();
    setIsLoading(false);
  };

  return (
    <GridContainer container>
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
            <Thumbnail key={file.name} src={createObjectURL(file)} alt={`image-${index}`} />
          ))}
        </ThumbnailContainer>
      </Grid>

      <Button
        style={{ marginBottom: '4rem' }}
        variantType="gradient"
        size="large"
        onClick={onPublish}
        isLoading={isLoading}>
        {t('chapterCreate.chapterReview.publishButton')}
      </Button>
    </GridContainer>
  );
};