import { Grid, Typography, styled } from '@mui/material';

import Button from '@components/Button';
import theme from '@styles/theme';

export const GridContainer = styled(Grid)({
  border: '3px solid transparent',
  borderImage: theme.customPalette.gradientBox.main,
  borderImageSlice: 1,
  borderRadius: '10px',

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: '2rem',
  marginBottom: '10rem',
});

export const Title = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontWeight: 700,
  lineHeight: '52px',
  marginBottom: '2rem',
  marginLeft: '4rem',
  marginTop: '2rem',
  textAlign: 'left',
  [defaultTheme.breakpoints.between('xs', 'lg')]: {
    fontSize: '35px',
  },
  [defaultTheme.breakpoints.up('lg')]: {
    fontSize: '42px',
  },
}));

export const SectionTitle = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '22px',
  marginBottom: '1rem',
  marginLeft: '4rem',
  textAlign: 'left',
}));

export const SectionDescription = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontWeight: 500,
  lineHeight: '22px',
  marginLeft: '4rem',
  textAlign: 'left',
  whiteSpace: 'pre-line',
  marginBottom: '1rem',
}));

export const ThumbnailContainer = styled('div')(() => ({
  display: 'flex',
  marginBottom: '2rem',
  marginLeft: '4rem',
  flexWrap: 'wrap',
  gap: theme.spacing(5),
}));

export const Thumbnail = styled('img')(() => ({
  width: '200px',
  height: '200px',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}));

export const SubmitButton = styled(Button)({
  display: 'block',
  marginBottom: '2rem',
  width: 'fit-content',
});
