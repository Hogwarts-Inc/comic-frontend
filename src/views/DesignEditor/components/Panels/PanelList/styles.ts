import styled from '@emotion/styled';

import theme from '../../../../../styles/theme';

export const ButtonText = styled('p')({
  fontSize: '0.7rem',
  margin: 0,
});

export const ButtonsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '60%',
  margin: '8rem auto ',
});
export const ButtonContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

export const Container = styled('div')({
  display: 'flex',
  padding: '1.25rem 0 0 1.25rem',
  background: `linear-gradient(181deg, ${theme.palette.secondary.main} 0.23%, 
    ${theme.customPalette.third.main} 14.06%, ${theme.palette.primary.main} 36.98%)`,
  flexDirection: 'column',
  width: '7.5625rem',
  minWidth: '7.5625rem',
});

export const WhiteContainer = styled('div')({
  display: 'flex',
  flex: 'none',
  background: theme.palette.common.white,
  borderTopLeftRadius: '1.875rem',
  overflow: 'hidden',
  height: '100%',
});

export const SubContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flex: 'none',
});
