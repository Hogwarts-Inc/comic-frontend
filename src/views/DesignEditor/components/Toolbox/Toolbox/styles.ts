import styled from '@emotion/styled';

import { Colors } from '@styles/colors';

export const Container = styled('div')(() => ({
  boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 1px',
  height: '3.125rem',
  display: 'flex',
}));

export const ButtonsContainer = styled('div')(() => ({
  display: 'flex',
  flex: '1 0 0%',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginRight: '2rem',
}));

export const ButtonsSeparator = styled('div')(() => ({
  width: '0.0625rem',
  height: '0.875rem',
  margin: '0 1rem',
  background: Colors.gray,
}));
