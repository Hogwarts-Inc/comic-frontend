/* eslint-disable indent */
import React, { useEffect, useMemo } from 'react';

import { EditorPanelItem } from './styles';
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
    <EditorPanelItem id="EditorPanelItem" isMobile={!!isMobile} isSidebarOpen={isSidebarOpen}>
      {!!Component && <Component />}
    </EditorPanelItem>
  );
}

export default PanelsList;
