import { styled, Typography, Grid } from '@mui/material';

export const GridItemCenter = styled(Grid)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const GridContainer = styled(Grid)({
  marginBottom: '8rem',
  paddingLeft: '2rem',
  paddingRight: '2rem',
});

export const TypographyTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'medium',
  textAlign: 'left',
  width: '100%',
}));

export const TypographyDescription = styled(Typography)(({ theme }) => ({
  color: theme.customPalette.third.main,
  textAlign: 'left',
}));
