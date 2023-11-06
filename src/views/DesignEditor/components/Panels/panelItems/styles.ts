import { styled } from '@mui/material';

export const ImageContainer = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  display: 'grid',
  gap: '8px',
  gridTemplateColumns: `repeat(${isMobile ? '4' : '2'}, 1fr)`,
  marginTop: '1rem',
}));
export const CharacterContainer = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  display: 'grid',
  gap: '8px',
  gridTemplateColumns: `repeat(${isMobile ? '4' : '2'}, 1fr)`,
}));
