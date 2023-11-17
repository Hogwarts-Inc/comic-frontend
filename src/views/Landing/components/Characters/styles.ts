import { styled, Typography, Grid } from '@mui/material';

export const GridItemCenter = styled(Grid)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const TypographyTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

export const TypographyName = styled(Typography)(({ theme }) => ({
  color: theme.customPalette.third.main,
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    lineHeight: '3rem',
    fontSize: '3.125rem',
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    fontSize: '3.563rem',
  },
}));

export const TypographyDescription = styled(Typography)(({ theme }) => ({
  color: theme.customPalette.third.main,
  textAlign: 'justify',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    width: '80%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '70%',
  },
}));

export const GridContainer = styled(Grid)({
  paddingLeft: '2rem',
  paddingRight: '2rem',
});
