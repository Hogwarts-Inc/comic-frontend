import { Grid, Typography, styled } from '@mui/material';

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
  marginTop: '5rem',
});

export const Title = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  marginLeft: '4rem',
  fontWeight: 700,
  lineHeight: "52px",
  textAlign: 'left',
  marginTop: '2rem',
  [defaultTheme.breakpoints.down('sm')]: {
    marginBottom: '1rem',
    fontSize: '18px',
  },
  [defaultTheme.breakpoints.between('sm', 'lg')]: {
    marginBottom: '2rem',
    fontSize: '35px',
  },
  [defaultTheme.breakpoints.up('lg')]: {
    marginBottom: '2rem',
    fontSize: '42px',
  },
}));

export const SectionTitle = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontWeight: 500,
  marginLeft: '4rem',
  lineHeight: "22px",
  textAlign: 'left',
  marginBottom: '2rem',
}));

export const SectionDescription = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontWeight: 500,
  lineHeight: "22px",
  marginLeft: '4rem',
  textAlign: 'left',
  whiteSpace: 'pre-line',
  marginBottom: '2rem',
}));

export const ThumbnailContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: '2rem',
  marginLeft: '4rem',
  flexWrap: 'wrap',
  gap: theme.spacing(5),
}));

export const Thumbnail = styled('img')(({ theme }) => ({
  width: '300px',
  height: '300px',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}));