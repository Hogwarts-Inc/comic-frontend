import { Box, Grid, Typography, styled } from '@mui/material';

import Button from '@components/Button';
import theme from '@styles/theme';

export const GridContainer = styled(Grid)({
  border: '3px solid transparent',
  borderImage: theme.customPalette.gradientBox.main,
  borderImageSlice: 1,
  borderRadius: '10px',

  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
});

export const SectionTitle = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  textAlign: 'left',
}));

export const SectionDescription = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontWeight: 500,
  textAlign: 'left',
  whiteSpace: 'pre-line',
}));

export const ThumbnailContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  gap: '1rem',
}));

export const Thumbnail = styled('img')(() => ({
  borderRadius: theme.shape.borderRadius,
  height: '200px',
  objectFit: 'cover',
  width: '200px',
}));

export const SubmitButton = styled(Button)({
  marginTop: '1rem',
  width: 'fit-content',
});

export const SubmitBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));
