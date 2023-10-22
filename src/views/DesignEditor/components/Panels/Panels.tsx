import React from 'react';

import PanelItem from './PanelItem/PanelItem';
import PanelsList from './PanelList/PanelsList';
import { Separator } from './styles';

function Panels() {
  return (
    <>
      <PanelsList />
      <Separator />
      <PanelItem />
    </>
  );
}

export default Panels;
