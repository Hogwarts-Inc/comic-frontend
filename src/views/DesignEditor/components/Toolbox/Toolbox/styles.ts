import { styled } from '@mui/material';

export const Container = styled('div')(() => ({
  boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 1px',
  height: '6.25rem',
  display: 'flex',
}));

export const ButtonsContainer = styled('div')(() => ({
  display: 'flex',
  flex: '1 0 0%',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginRight: '2rem',
}));
export const ButtonsSeparator = styled('div')(({ theme }) => ({
  width: '0.0625rem',
  height: '0.875rem',
  margin: '0 1rem',
  background: theme.palette.background.default,
}));
