import { Grid, Typography, styled } from '@mui/material';

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

export const Title = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  marginLeft: '4rem',
  marginTop: '2rem',
  textAlign: 'left',
  [defaultTheme.breakpoints.between('xs', 'lg')]: {
    fontSize: '2.188rem',
    marginBottom: '2rem',
  },
  [defaultTheme.breakpoints.up('lg')]: {
    marginBottom: '2rem',
  },
}));

export const SectionTitle = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  marginBottom: '1rem',
  marginLeft: '4rem',
  textAlign: 'left',
}));

export const SectionDescription = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontWeight: 500,
  marginBottom: '1rem',
  marginLeft: '4rem',
  textAlign: 'left',
  whiteSpace: 'pre-line',
}));

export const ThumbnailContainer = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(5),
  marginBottom: '2rem',
  marginLeft: '4rem',
}));

export const Thumbnail = styled('img')(() => ({
  borderRadius: theme.shape.borderRadius,
  height: '200px',
  objectFit: 'cover',
  width: '200px',
}));

export const SubmitButton = styled(Button)({
  marginBottom: '2rem',
  width: 'fit-content',
});
