import { Grid, styled } from '@mui/material';

export const Container = styled(Grid)<{ isMobile: boolean }>(({ isMobile }) => ({
  boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 1px',
  overflow: 'scroll',
  minHeight: isMobile ? undefined : '3.125rem',
  justifyContent: isMobile ? 'center' : undefined,
  borderBottom: isMobile ? '1px solid rgb(0 0 0 / 15%)' : undefined,
}));

export const ButtonsContainer = styled('div')(() => ({
  display: 'flex',
  flex: '1 0 0%',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: '0 2rem 0 1rem',
}));
export const ButtonsSeparator = styled('div')(({ theme }) => ({
  width: '0.0625rem',
  height: '0.875rem',
  margin: '0 1rem',
  background: theme.palette.background.default,
}));
