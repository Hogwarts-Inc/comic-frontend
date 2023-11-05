import React from 'react';

import { Block } from 'baseui/block';

import AngleDoubleLeft from '@components/Icons/AngleDoubleLeft';
import useAppContext from 'src/hooks/useAppContext';
import useSetIsSidebarOpen from 'src/hooks/useSetIsSidebarOpen';

export function CloseSideBar() {
  const { setActivePanel, isMobile } = useAppContext();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  return (
    <Block
      onClick={() => {
        setIsSidebarOpen(false);
        setActivePanel('');
      }}
      $style={{ cursor: 'pointer', display: 'flex', rotate: isMobile ? '90deg' : undefined }}>
      <AngleDoubleLeft size={18} />
    </Block>
  );
}
