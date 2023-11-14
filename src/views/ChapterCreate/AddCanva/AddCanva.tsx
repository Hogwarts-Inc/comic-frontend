/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React from 'react';

import { Divider, Grid } from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';
import theme from '@styles/theme';

import { Title, OutsideGridContainer, ColGridContainer, SectionTitle, SectionDescription } from './styles';

interface AddCanvaProps {
  onNext: () => void;
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const AddCanva = ({ onNext, values, setFieldValue }: AddCanvaProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleFileChange = (fileObjects: File[]) => {
    setFieldValue('files', fileObjects);
  };

  const onNavigateToEditor = () => {
    router.push('/editor');
  };

  return (
    <OutsideGridContainer container>
      <Grid item xs={12}>
        <Title>{t('chapterCreate.title')}</Title>
      </Grid>

      <ColGridContainer container>
        <Grid item xs={5}>
          <SectionTitle>{t('chapterCreate.addCanva.uploadTitle')}</SectionTitle>
          <SectionDescription>{t('chapterCreate.addCanva.uploadDescription')}</SectionDescription>

          <DropzoneArea
            acceptedFiles={['image/jpeg', 'image/png']}
            dropzoneText={t('chapterCreate.addCanva.dropZone')}
            onChange={handleFileChange}
            maxFileSize={5000000}
            filesLimit={3}
            fileObjects={values.files}
          />

          <Button
            style={{
              display: 'block',
              margin: '1rem auto 0',
              width: 'fit-content',
            }}
            variantType="gradient"
            size="large"
            onClick={onNext}
            disabled={values.files.length === 0}>
            {t('common.next')}
          </Button>
        </Grid>

        <Divider
          orientation="vertical"
          flexItem
          style={{
            width: '1px',
            marginLeft: '2rem',
            backgroundColor: theme.palette.text.primary,
          }}
        />

        <Grid
          item
          xs={5}
          style={{
            marginLeft: '2rem',
          }}>
          <SectionTitle>{t('chapterCreate.addCanva.navToEditorTitle')}</SectionTitle>
          <Button
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '4rem auto 0 auto',
              width: 'fit-content',
            }}
            variantType="gradient"
            size="large"
            onClick={onNavigateToEditor}>
            {t('chapterCreate.addCanva.navToEditorButton')}
          </Button>
        </Grid>
      </ColGridContainer>
    </OutsideGridContainer>
  );
};
