import { Block } from 'baseui/block';

import AngleDoubleLeft from '@components/Icons/AngleDoubleLeft';
import useAppContext from 'src/hooks/useAppContext';
import useSetIsSidebarOpen from 'src/hooks/useSetIsSidebarOpen';

export const CloseSideBar = () => {
  const { setActivePanel } = useAppContext();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  return (
    <Block
      onClick={() => {
        setIsSidebarOpen(false);
        setActivePanel('');
      }}
      $style={{ cursor: 'pointer', display: 'flex' }}>
      <AngleDoubleLeft size={18} />
    </Block>
  );
};
