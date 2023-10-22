import React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';

import { PanelListItem } from './PanelListItem';
import { ButtonsContainer, Container, SubContainer, WhiteContainer } from './styles';
import Scrollable from '../../../../../components/Scrollable';
import { BASE_ITEMS, PanelType } from '../../../../../constants/app-options';

function PanelsList() {
  const { t } = useTranslation();
  const { back } = useRouter();
  return (
    <Container>
      <div style={{ margin: 'auto auto 1rem auto' }}>
        <Button onClick={back}>{t('volver')}</Button>
      </div>
      <WhiteContainer>
        <SubContainer>
          <Scrollable autoHide>
            <ButtonsContainer>
              {BASE_ITEMS.map(panelListItem => (
                <PanelListItem
                  label={t(`panels.panelsList.${panelListItem.id}`)}
                  name={panelListItem.name as PanelType}
                  key={panelListItem.name}
                  icon={panelListItem.name}
                />
              ))}
            </ButtonsContainer>
          </Scrollable>
        </SubContainer>
      </WhiteContainer>
    </Container>
  );
}

export default PanelsList;
