import { Typography, styled } from '@mui/material';

export const Title = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  textAlign: 'left',
  [defaultTheme.breakpoints.between('xs', 'lg')]: {
    fontSize: '2.188rem',
  },
}));
