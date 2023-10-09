import React, { useEffect, useMemo } from 'react';

import { Block } from 'baseui/block';

import useAppContext from '../../../../../hooks/useAppContext';
import useIsSidebarOpen from '../../../../../hooks/useIsSidebarOpen';
import panelItems from '../panelItems';

interface State {
  panel: string;
}
const PanelsList = () => {
  const [state, setState] = React.useState<State>({ panel: '' });
  const isSidebarOpen = useIsSidebarOpen();
  const { activePanel, activeSubMenu } = useAppContext();

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
        width: isSidebarOpen ? '306px' : 0,
        flex: 'none',
        borderRight: '1px solid #d7d8e3',
        display: 'flex',
        transition: 'ease width 0.1s',
        overflow: 'hidden',
      }}>
      {!!Component && <Component />}
    </Block>
  );
};

export default PanelsList;
