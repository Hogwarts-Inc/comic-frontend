import { Typography, styled } from '@mui/material';

export const Title = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  marginLeft: '4rem',
  marginTop: '2rem',
  textAlign: 'left',
  [defaultTheme.breakpoints.between('xs', 'lg')]: {
    fontSize: '2.188rem',
    marginBottom: '2rem',
  },
  [defaultTheme.breakpoints.up('lg')]: {
    marginBottom: '2rem',
  },
}));
