/* eslint-disable indent */
import React, { useEffect, useMemo } from 'react';

import { Block } from 'baseui/block';

import useAppContext from '../../../../../hooks/useAppContext';
import useIsSidebarOpen from '../../../../../hooks/useIsSidebarOpen';
import panelItems from '../panelItems';

interface State {
  panel: string;
}
function PanelsList() {
  const [state, setState] = React.useState<State>({ panel: '' });
  const isSidebarOpen = useIsSidebarOpen();
  const { activePanel, activeSubMenu, isMobile } = useAppContext();

  useEffect(() => {
    setState({ panel: activePanel });
  }, [activePanel]);

  useEffect(() => {
    if (activeSubMenu) {
      setState({ panel: activeSubMenu });
    } else {
      setState({ panel: activePanel });
    }
  }, [activePanel, activeSubMenu]);

  const Component = useMemo(() => panelItems[state.panel], [state.panel]);
  return (
    <Block
      id="EditorPanelItem"
      $style={{
        background: '#ffffff',
        flex: 'none',
        display: 'flex',
        overflow: 'hidden',
        ...(isMobile && isSidebarOpen
          ? {
              position: 'absolute',
              height: isSidebarOpen ? '40%' : 0,
              width: '100%',
              zIndex: 1,
              transition: 'ease heigth 0.1s',
              border: '1px solid #d7d8e3',
            }
          : { transition: 'ease width 0.1s', width: isSidebarOpen ? '306px' : 0, borderRight: '1px solid #d7d8e3' }),
      }}>
      {!!Component && <Component />}
    </Block>
  );
}

export default PanelsList;
