import { styled, Typography, Grid } from '@mui/material';

export const GridItemCenter = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const TypographyTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontStyle: 'normal',
  fontWeight: 700,
  letterSpacing: '-0.4px',
  color: theme.palette.text.primary,
  lineHeight: '52px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '29px',
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    fontSize: '35px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '42px',
  },
}));

export const TypographyName = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontStyle: 'normal',
  fontWeight: 700,
  color: theme.customPalette.third.main,
  lineHeight: '32px',
  [theme.breakpoints.down('sm')]: {
    lineHeight: '48px',
    fontSize: '50px',
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    fontSize: '57px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '64px',
  },
}));

export const TypographyDescription = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontStyle: 'normal',
  fontWeight: 700,
  color: theme.customPalette.third.main,
  lineHeight: '30px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
    width: '90%',
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    fontSize: '20px',
    width: '80%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '70%',
    fontSize: '24px',
  },
}));

export const GridContainer = styled(Grid)({
  paddingLeft: '2rem',
  paddingRight: '2rem',
});
