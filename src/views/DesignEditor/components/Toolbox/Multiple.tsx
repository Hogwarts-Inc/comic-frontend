import React from 'react';

import { Block } from 'baseui/block';
import { useTranslation } from 'react-i18next';

import Common from './Common';

function Multiple() {
  const { t } = useTranslation();
  return (
    <Block
      $style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        justifyContent: 'space-between',
      }}>
      <Block>{t('editor.groupName')}</Block>
      <Common />
    </Block>
  );
}

export default Multiple;
