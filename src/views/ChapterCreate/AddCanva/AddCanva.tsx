/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React from 'react';

import { Grid } from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Route } from 'src/constants/routes';
import { setCanvaFiles } from 'src/store/slices/add-canva/actions';
import { setChapterFiles } from 'src/store/slices/chapter-create/actions';

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
  context: 'chapter' | 'canva';
  values?: any;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  onNext?: () => void;
}

const TitleView = ({ context }: { context: 'chapter' | 'canva' }) => {
  const { t } = useTranslation();
  const title = context === 'chapter' ? t('chapterCreate.title') : t('addCanva.title');
  return <Title variant="h3">{title}</Title>;
};

export const AddCanva = ({ context, values, setFieldValue, onNext }: AddCanvaProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  const createObjectURL = (file: File) => URL.createObjectURL(file);

  const handleFileChange = (fileObjects: File[]) => {
    setFieldValue?.('files', fileObjects);

    const newFileObjects = fileObjects.map(file => createObjectURL(file));
    if (context === 'chapter') {
      dispatch(setChapterFiles(newFileObjects));
    } else {
      dispatch(setCanvaFiles(newFileObjects));
    }
  };

  const onNavigateToEditor = () => {
    router.push(Route.editor);
  };

  return (
    <OutsideGridContainer container>
      <Grid item xs={12}>
        <TitleView context={context} />
      </Grid>

      <ColGridContainer container>
        <ItemGridContainer item xs={12} sm={5}>
          <SectionTitle variant="h4">{t('chapterCreate.addCanva.uploadTitle')}</SectionTitle>
          <SectionDescription>{t('chapterCreate.addCanva.uploadDescription')}</SectionDescription>

          <DropzoneArea
            acceptedFiles={['image/jpeg', 'image/png']}
            dropzoneText={t('chapterCreate.addCanva.dropZone')}
            fileObjects={values?.files}
            filesLimit={3}
            maxFileSize={1048576}
            onChange={handleFileChange}
          />

          <NextButton disabled={values?.files.length === 0} size="large" variantType="gradient" onClick={onNext}>
            {t('common.next')}
          </NextButton>
        </ItemGridContainer>

        <DividerLine flexItem />

        <SecondItemGridContainer item xs={12} sm={5}>
          <SectionTitle variant="h4">{t('chapterCreate.addCanva.navToEditorTitle')}</SectionTitle>
          <EditorButton variantType="gradient" size="large" onClick={onNavigateToEditor}>
            {t('chapterCreate.addCanva.navToEditorButton')}
          </EditorButton>
        </SecondItemGridContainer>
      </ColGridContainer>
    </OutsideGridContainer>
  );
};
