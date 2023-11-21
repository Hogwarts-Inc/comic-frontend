import { Grid, Typography, styled } from '@mui/material';

export const TypographyTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
    lineHeight: '3rem',
    marginTop: '2rem',
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    margin: '3rem',
  },
  [theme.breakpoints.up('lg')]: {
    margin: '4rem',
    lineHeight: '4.375rem',
  },
}));

export const MainComicGrid = styled(Grid)(() => ({
  justifyContent: 'center',
}));
