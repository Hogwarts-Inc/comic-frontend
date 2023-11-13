import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@components/Button';
import { Title, OutsideGridContainer, TitleTextField, ColGridContainer, SectionTitle, SectionDescription } from './styles';
import { Divider, Grid } from '@mui/material';
import theme from '@styles/theme';
import { DropzoneArea } from 'mui-file-dropzone';

interface AddInfoProps {
  onNext: () => void;
}

export const AddCanva = ({ onNext }: AddInfoProps) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);

  const handleFileChange = (fileObjects: any) => {
    setFiles(fileObjects);
  };

  return (
    <OutsideGridContainer container>
      <Grid item xs={12}>
        <Title>{t('chapterCreate.title')}</Title>
      </Grid>

      <ColGridContainer container>
        <Grid item xs={5} >
          <SectionTitle>{t('chapterCreate.addCanva.uploadTitle')}</SectionTitle>
          <SectionDescription>{t('chapterCreate.addCanva.uploadDescription')}</SectionDescription>

          <DropzoneArea
            acceptedFiles={['image/jpeg', 'image/png']}
            dropzoneText={t('chapterCreate.addCanva.dropZone')}
            onChange={handleFileChange}
            maxFileSize={5000000}
            filesLimit={3}
            fileObjects={files}
          />

          {files.length > 0 && (
            <Button
              style={{
                display: 'block',
                margin: '1rem auto 0',
                width: 'fit-content'
              }}
              variantType="gradient"
              size="large"
              onClick={onNext}
            >
              {t('common.next')}
            </Button>
          )}
        </Grid>

        <Divider orientation="vertical" flexItem style={{
          width: '1px', marginLeft: '2rem',
          backgroundColor: theme.palette.text.primary
        }} />

        <Grid item xs={5} style={{
          marginLeft: '2rem',
        }}>
          <SectionTitle>{t('chapterCreate.addCanva.navToEditorTitle')}</SectionTitle>
          <Button
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '4rem auto 0 auto',
              width: 'fit-content'
            }} variantType="gradient"
            size="large"
            onClick={onNext}
          >
            {t('chapterCreate.addCanva.navToEditorButton')}
          </Button>
        </Grid>
      </ColGridContainer>
    </OutsideGridContainer >
  );
}
