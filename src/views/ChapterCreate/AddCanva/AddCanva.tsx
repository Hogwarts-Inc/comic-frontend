/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React from 'react';

import { Grid } from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { TitleView } from '@components/AddCanvaTitleView';
import { Route } from 'src/constants/routes';
import useDesignEditorContext from 'src/hooks/useDesignEditorContext';
import { ContextType } from 'src/interfaces/common';
import { setCanvaFiles } from 'src/store/slices/canva-creator/reducer';
import { toBase64 } from 'src/utils/data';

import {
  OutsideGridContainer,
  ColGridContainer,
  SectionTitle,
  SectionDescription,
  EditorButton,
  NextButton,
  DividerLine,
  ItemGridContainer,
} from './styles';

interface AddCanvaProps {
  context: ContextType;
  values?: any;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  onNext?: () => void;
}

export const AddCanva = ({ context, values, setFieldValue, onNext }: AddCanvaProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { setScenes } = useDesignEditorContext();

  const handleFileChange = async (fileObjects: File[]) => {
    setFieldValue?.('files', fileObjects);

    const newFileObjects = await Promise.all(fileObjects.map(toBase64));
    dispatch(setCanvaFiles(newFileObjects));
  };

  const onNavigateToEditor = () => {
    if (values?.files?.length) {
      if (confirm(t('confirmNavigateToEditor'))) {
        setFieldValue?.('files', []);
        dispatch(setCanvaFiles([]));
        setScenes([]);
        router.push(Route.editor);
      }
    } else {
      setScenes([]);
      router.push(Route.editor);
    }
  };

  return (
    <OutsideGridContainer container gap="2rem">
      <Grid container item xs={12}>
        <TitleView context={context} />
      </Grid>

      <ColGridContainer container xs>
        <ItemGridContainer container item xs={12} sm>
          <SectionTitle variant="h4">{t('chapterCreate.addCanva.uploadTitle')}</SectionTitle>
          <SectionDescription>{t('chapterCreate.addCanva.uploadDescription')}</SectionDescription>

          <DropzoneArea
            acceptedFiles={['image/jpeg', 'image/png']}
            dropzoneText={t('chapterCreate.addCanva.dropZone')}
            fileObjects={values?.files}
            filesLimit={3}
            maxFileSize={1000000}
            onChange={handleFileChange}
            initialFiles={values?.files}
            dropzoneClass="customDropzone"
            showPreviews={false}
            showAlerts={['error']}
            getDropRejectMessage={(rejectedFile: File) =>
              t('chapterCreate.addCanva.fileRejected', {
                fileName: rejectedFile.name,
              })
            }
            getFileLimitExceedMessage={(filesLimit: number) =>
              t('chapterCreate.addCanva.maximunExceeded', { max: filesLimit })
            }
          />

          <NextButton disabled={values?.files.length === 0} size="large" onClick={onNext}>
            {t('common.next')}
          </NextButton>
        </ItemGridContainer>

        <DividerLine flexItem />

        <ItemGridContainer container item xs={12} sm gap="2rem" direction="column" margin="auto">
          <SectionTitle variant="h4" textAlign="center">
            {t('chapterCreate.addCanva.navToEditorTitle')}
          </SectionTitle>
          <EditorButton size="large" onClick={onNavigateToEditor}>
            {t('chapterCreate.addCanva.navToEditorButton')}
          </EditorButton>
        </ItemGridContainer>
      </ColGridContainer>
    </OutsideGridContainer>
  );
};
