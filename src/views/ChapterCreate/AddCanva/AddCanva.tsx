/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import {
  Title,
  OutsideGridContainer,
  ColGridContainer,
  SectionTitle,
  SectionDescription,
  EditorButton,
  NextButton,
  DividerLine,
  ItemGridContainer,
  SecondItemGridContainer,
} from './styles';

interface AddCanvaProps {
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onNext: () => void;
}

export const AddCanva = ({ values, setFieldValue, onNext }: AddCanvaProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [fileObjects, setFileObjects] = useState<File[]>([]);

  useEffect(() => {
    if (values.files.length > 0) {
      setFieldValue('files', values.files);
    }
  }, [values.files, setFieldValue]);

  const handleFileChange = (newFileObjects: File[]) => {
    setFileObjects(newFileObjects);
    setFieldValue('files', newFileObjects);
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
        <ItemGridContainer item xs={12} sm={5}>
          <SectionTitle>{t('chapterCreate.addCanva.uploadTitle')}</SectionTitle>
          <SectionDescription>{t('chapterCreate.addCanva.uploadDescription')}</SectionDescription>

          <DropzoneArea
            acceptedFiles={['image/jpeg', 'image/png']}
            dropzoneText={t('chapterCreate.addCanva.dropZone')}
            onChange={handleFileChange}
            maxFileSize={5000000}
            filesLimit={3}
            fileObjects={fileObjects}
          />

          <NextButton
            variantType="gradient"
            size="large"
            onClick={onNext}
            disabled={values.files.length === 0}>
            {t('common.next')}
          </NextButton>
        </ItemGridContainer>

        <DividerLine
          flexItem
        />

        <SecondItemGridContainer item xs={12} sm={5}>
          <SectionTitle>{t('chapterCreate.addCanva.navToEditorTitle')}</SectionTitle>
          <EditorButton
            variantType="gradient"
            size="large"
            onClick={onNavigateToEditor}>
            {t('chapterCreate.addCanva.navToEditorButton')}
          </EditorButton>
        </SecondItemGridContainer>
      </ColGridContainer>
    </OutsideGridContainer>
  );
};
