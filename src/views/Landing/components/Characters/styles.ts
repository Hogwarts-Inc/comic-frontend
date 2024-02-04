import { styled, Typography, Grid } from '@mui/material';

export const GridItemCenter = styled(Grid)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const GridItemName = styled(GridItemCenter)({});

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
  fontSize: '3.563rem',
  lineHeight: '4.375rem',
}));

export const TypographyDescription = styled(Typography)(({ theme }) => ({
  color: theme.customPalette.third.main,
  width: '80%',
  textAlign: 'center',
}));

export const GridContainer = styled(Grid)({});
