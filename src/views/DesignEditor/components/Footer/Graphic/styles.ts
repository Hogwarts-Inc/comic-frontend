import { styled } from '@mui/material';
import { Block } from 'baseui/block';

export const SceneButton = styled(Block)(({ theme }) => ({
  fontSize: '14px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 1rem',
  ':hover': {
    backgroundColor: theme.customPalette.blackTransparent.secondary,
    cursor: 'pointer',
  },
}));

export const SceneButtonContainer = styled(Block)<{ top: string; left: string }>(({ theme, left, top }) => ({
  width: '160px',
  position: 'absolute',
  backgroundColor: '#ffffff',
  boxShadow: `0 0 0 1px ${theme.customPalette.shadow.main},0 2px 12px ${theme.customPalette.shadow.secondary}`,
  zIndex: 4,
  top,
  left,
  padding: '0.5rem 0',
}));

export const CloseButton = styled(Block)<{ isOpen: boolean }>(({ isOpen }) => ({
  padding: '0.5rem',
  cursor: 'pointer',
  display: 'flex',
  rotate: isOpen ? '270deg' : '90deg',
}));

export const TimelineContainer = styled(Block)({
  padding: '0.25rem 0.75rem',
  background: '#ffffff',
  position: 'relative',
});

export const AddButton = styled('div')(({ theme }) => ({
  width: '100px',
  height: '56px',
  background: theme.customPalette.ligth.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

export const DraggedScene = styled(Block)<{ backgroundImage: string; backgroundSize: string }>(
  ({ backgroundImage, backgroundSize }) => ({
    backgroundImage,
    backgroundSize,
    height: '80px',
    opacity: 0.75,
  }),
);
