import { styled, Typography, Grid } from '@mui/material';

export const GridItemCenter = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const GridContainer = styled(Grid)({
  paddingLeft: '2rem',
  paddingRight: '2rem',
});

export const TypographyTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '1.645rem',
  textAlign: 'left',
  fontWeight: 'medium',
  width: '100%',
}));

export const TypographyDescription = styled(Typography)(({ theme }) => ({
  color: theme.customPalette.third.main,
  fontSize: '0.725rem',
  textAlign: 'left',
  fontWeight: 'medium',
}));
