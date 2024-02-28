import React from 'react';

import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Button from '@components/Button';
import { handleRemoveFromQueue } from 'src/helpers/chaptersQueue';
import useIsMobile from 'src/hooks/useIsMobile';
import { RootState } from 'src/store/rootReducer';

import { PanelListItem } from './PanelListItem';
import { ButtonsContainer, Container, WhiteContainer } from './styles';
import { BASE_ITEMS, PanelType } from '../../../../../constants/app-options';
import { SaveCanvaButton } from '../../SaveCanvaButton';

function PanelsList() {
  const { t } = useTranslation();
  const { back } = useRouter();
  const isMobile = useIsMobile();
  const { chapterId, isCreating } = useSelector((state: RootState) => state.chapterQueue);
  return (
    <Container container xs direction="column" isMobile={!!isMobile} wrap="nowrap">
      <Grid
        container
        item
        xs="auto"
        justifyContent={isMobile ? 'space-between' : 'center'}
        margin={isMobile ? '1rem' : undefined}
        marginBottom={0}>
        <Button
          onClick={async () => {
            if (isCreating) await handleRemoveFromQueue(chapterId);
            back();
          }}>
          {t('back')}
        </Button>
        {isMobile && <SaveCanvaButton />}
      </Grid>
      <WhiteContainer container xs isMobile={!!isMobile}>
        <ButtonsContainer container wrap="nowrap" direction={isMobile ? 'row' : 'column'}>
          {BASE_ITEMS.map(panelListItem => (
            <PanelListItem
              label={t(`panels.panelsList.${panelListItem.id}`)}
              name={panelListItem.name as PanelType}
              key={panelListItem.name}
              icon={panelListItem.name}
            />
          ))}
        </ButtonsContainer>
      </WhiteContainer>
    </Container>
  );
}

export default PanelsList;
