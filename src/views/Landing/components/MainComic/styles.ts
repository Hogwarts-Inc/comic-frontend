import { Grid, Typography, styled } from '@mui/material';

export const TypographyTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: 'center',
  margin: '4rem 0',
  maxWidth: '90%',
}));

export const MainComicGrid = styled(Grid)(() => ({
  justifyContent: 'center',
}));
