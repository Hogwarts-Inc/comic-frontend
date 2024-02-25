/* eslint-disable indent */
import React, { useEffect, useMemo } from 'react';

import useSetIsSidebarOpen from 'src/hooks/useSetIsSidebarOpen';

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
  const setIsSidebarOpen = useSetIsSidebarOpen();

  useEffect(() => {
    setState({ panel: activePanel });
  }, [activePanel]);

  useEffect(() => {
    const panel = activeSubMenu || activePanel;
    if (activeSubMenu) {
      setState({ panel: activeSubMenu });
    } else {
      setState({ panel: activePanel });
    }
    setIsSidebarOpen(!!panel);
    if (panel) {
      setState({ panel });
    }
  }, [activePanel, activeSubMenu, setIsSidebarOpen]);

  const Component = useMemo(() => panelItems[state.panel], [state.panel]);
  return (
    <EditorPanelItem id="EditorPanelItem" isMobile={!!isMobile} isSidebarOpen={isSidebarOpen}>
      {!!Component && <Component />}
    </EditorPanelItem>
  );
}

export default PanelsList;
