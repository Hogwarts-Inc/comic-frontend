import { styled, Typography, Grid } from '@mui/material';

export const GridItemCenter = styled(Grid)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const GridItemName = styled(GridItemCenter)({
  marginTop: '1rem',
});

export const GridItemImages = styled(GridItemCenter)({
  marginTop: '2rem',
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
  width: '80%',
  textAlign: 'center',
}));

export const GridContainer = styled(Grid)({
  paddingLeft: '2rem',
  paddingRight: '2rem',
});
