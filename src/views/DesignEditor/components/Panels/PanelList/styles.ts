import styled from '@emotion/styled';

import { Colors } from '@styles/colors';

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
  background: `linear-gradient(181deg, ${Colors.fuchsia} 0.23%, ${Colors.blue} 14.06%, ${Colors.green} 36.98%)`,
  flexDirection: 'column',
  width: '7.5625rem',
  minWidth: '7.5625rem',
});

export const WhiteContainer = styled('div')({
  display: 'flex',
  flex: 'none',
  background: Colors.white,
  borderTopLeftRadius: '1.875rem',
  overflow: 'hidden',
  height: '100%',
});

export const SubContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flex: 'none',
});
