import { useMemo } from 'react';

import Button from '@components/Button';
import Icons from '@components/Icons';
import { PanelType } from 'src/constants/app-options';
import useAppContext from 'src/hooks/useAppContext';
import useSetIsSidebarOpen from 'src/hooks/useSetIsSidebarOpen';

import { ButtonContainer, ButtonText } from './styles';

export const PanelListItem = ({ label, icon, name }: { label: string; icon: string; name: PanelType }) => {
  const { setActivePanel, activePanel } = useAppContext();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  const Icon = useMemo(() => Icons[icon], [icon]);
  return (
    <Button
      onClick={() => {
        setIsSidebarOpen(true);
        setActivePanel(name);
      }}
      isSelected={name === activePanel}
      fullWidth
      style={{ aspectRatio: '1/1' }}>
      <ButtonContainer>
        <Icon size={'2.25rem'} />
        <ButtonText>{label}</ButtonText>
      </ButtonContainer>
    </Button>
  );
};
