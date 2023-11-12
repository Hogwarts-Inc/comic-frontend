import { Typography, styled } from '@mui/material';

import theme from '@styles/theme';

export const Box = styled('div')({
  border: '3px solid transparent',
  borderImage: theme.customPalette.gradientBox.main,
  borderImageSlice: 1,
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '420px',
  width: '100%',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    height: '220px',
  },
});

export const Content = styled('div')(() => ({
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  textAlign: 'center',
}));

export const Description = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontWeight: 700,
  lineHeight: 1.2,
  textAlign: 'center',
  padding: '0 1rem',
  [defaultTheme.breakpoints.down('sm')]: {
    marginBottom: '1rem',
    fontSize: '18px',
  },
  [defaultTheme.breakpoints.between('sm', 'lg')]: {
    marginBottom: '2rem',
    fontSize: '35px',
  },
  [defaultTheme.breakpoints.up('lg')]: {
    marginBottom: '3rem',
    fontSize: '42px',
  },
}));
