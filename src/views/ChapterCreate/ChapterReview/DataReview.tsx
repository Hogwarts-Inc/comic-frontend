import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { TitleView } from '@components/AddCanvaTitleView';
import { ContextType } from 'src/interfaces/common';
import { TermsAndConditions, apisTermsAndConditions } from 'src/services/api';
import { resetChapterQueue } from 'src/store/slices/chapter-queue';

import {
  GridContainer,
  SectionTitle,
  SectionDescription,
  Thumbnail,
  ThumbnailContainer,
  SubmitButton,
  SubmitBox,
} from './styles';

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
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState<TermsAndConditions | undefined>();

  useEffect(() => {
    apisTermsAndConditions.getTermsAndConditions().then(({ data }) => {
      setTermsAndConditions(data);
    });
  }, []);

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
      <SubmitBox>
        <FormControlLabel
          required
          control={<Checkbox checked={isChecked} onChange={() => setChecked(!isChecked)} />}
          label={
            <Typography>
              <a href={termsAndConditions?.file_url} target="_blank" rel="noreferrer">
                {t('chapterCreate.chapterReview.termsAndConditions')}
              </a>
            </Typography>
          }
        />
        <SubmitButton
          isLoading={isSubmitting}
          size="large"
          variantType="gradient"
          disabled={!isChecked}
          onClick={async () => {
            await onNext();
            dispatch(resetChapterQueue());
          }}>
          {t('chapterCreate.chapterReview.publishButton')}
        </SubmitButton>
      </SubmitBox>
    </GridContainer>
  );
};
