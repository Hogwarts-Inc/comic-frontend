import React from 'react';

import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';
import useIsMobile from 'src/hooks/useIsMobile';

import { PanelListItem } from './PanelListItem';
import { ButtonsContainer, Container, WhiteContainer } from './styles';
import { BASE_ITEMS, PanelType } from '../../../../../constants/app-options';
import { SaveCanvaButton } from '../../SaveCanvaButton';

function PanelsList() {
  const { t } = useTranslation();
  const { back } = useRouter();
  const isMobile = useIsMobile();
  return (
    <Container container xs direction="column" isMobile={!!isMobile} wrap="nowrap">
      <Grid
        container
        item
        xs="auto"
        justifyContent={isMobile ? 'space-between' : 'center'}
        margin={isMobile ? '1rem' : undefined}
        marginBottom={0}>
        <Button onClick={back}>{t('back')}</Button>
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
