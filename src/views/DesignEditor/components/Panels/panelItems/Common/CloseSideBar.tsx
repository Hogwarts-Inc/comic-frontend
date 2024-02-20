import React from 'react';

import { Block } from 'baseui/block';

import AngleDoubleLeft from '@components/Icons/AngleDoubleLeft';
import useAppContext from 'src/hooks/useAppContext';

export function CloseSideBar() {
  const { setActivePanel, isMobile } = useAppContext();
  return (
    <Block
      onClick={() => {
        setActivePanel('');
      }}
      $style={{ cursor: 'pointer', display: 'flex', rotate: isMobile ? '90deg' : undefined }}>
      <AngleDoubleLeft size={18} />
    </Block>
  );
}
