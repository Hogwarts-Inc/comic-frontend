import React from 'react';

import useIsMobile from 'src/hooks/useIsMobile';

import PanelItem from './PanelItem/PanelItem';
import PanelsList from './PanelList/PanelsList';
import { Separator } from './styles';

const Panels = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <PanelsList />
      {!isMobile && <Separator />}
      <PanelItem />
    </>
  );
};

export default Panels;
