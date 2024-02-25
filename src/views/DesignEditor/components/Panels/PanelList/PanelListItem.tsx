import React, { useMemo } from 'react';

import { Grid } from '@mui/material';

import Button from '@components/Button';
import Icons from '@components/Icons';
import { PanelType } from 'src/constants/app-options';
import useAppContext from 'src/hooks/useAppContext';

import { ButtonContainer, ButtonText } from './styles';

export function PanelListItem({ label, icon, name }: { label: string; icon: string; name: PanelType }) {
  const { setActivePanel, activePanel } = useAppContext();
  const Icon = useMemo(() => Icons[icon], [icon]);
  return (
    <Grid item>
      <Button
        onClick={() => {
          setActivePanel(name);
        }}
        isSelected={name === activePanel}
        fullWidth
        style={{ aspectRatio: '1/1', height: '100%', width: '4.75rem', maxHeight: 'none' }}>
        <ButtonContainer>
          <Icon size="2.25rem" />
          <ButtonText>{label}</ButtonText>
        </ButtonContainer>
      </Button>
    </Grid>
  );
}
