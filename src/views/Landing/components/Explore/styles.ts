import { Typography, styled } from '@mui/material';

import theme from '@styles/theme';

export const Box = styled('div')({
  alignItems: 'center',
  border: '3px solid transparent',
  borderImage: theme.customPalette.gradientBox.main,
  borderImageSlice: 1,
  borderRadius: '10px',
  display: 'flex',
  padding: '4rem 0',
  justifyContent: 'center',
  margin: '0 auto',
  width: '90%',
});

export const Content = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  textAlign: 'center',
  width: '80%',
}));

export const TypographyDescription = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  textAlign: 'center',
  padding: '0 1rem',
  marginBottom: '3rem',
}));
