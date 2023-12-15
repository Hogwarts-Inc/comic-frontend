import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  Title,
  GridContainer,
  SectionTitle,
  SectionDescription,
  Thumbnail,
  ThumbnailContainer,
  SubmitButton,
} from './styles';

interface ChapterReviewProps {
  context: 'chapter' | 'canva';
  onNext: () => void;
  values: {
    title?: string;
    description?: string;
    files: string[];
  };
}

const TitleView = ({ context }: { context: 'chapter' | 'canva' }) => {
  const { t } = useTranslation();
  const title = context === 'chapter' ? t('chapterCreate.title') : t('addCanva.title');
  return <Title variant="h3">{title}</Title>;
};

export const DataReview = ({ context, onNext, values }: ChapterReviewProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const onPublish = () => {
    setIsLoading(true);
    onNext();
    setIsLoading(false);
  };

  return (
    <GridContainer container>
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

      <Grid item xs={12}>
        <SectionTitle variant="h4">{t('chapterCreate.chapterReview.createdCanvas')}</SectionTitle>
        <ThumbnailContainer>
          {values.files.map((file, index) => (
            <Thumbnail key={file} src={file} alt={`image-${index}`} />
          ))}
        </ThumbnailContainer>
      </Grid>

      <SubmitButton isLoading={isLoading} size="large" variantType="gradient" onClick={onPublish}>
        {t('chapterCreate.chapterReview.publishButton')}
      </SubmitButton>
    </GridContainer>
  );
};
