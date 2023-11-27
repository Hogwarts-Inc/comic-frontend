import { Divider, Grid, Typography, styled } from '@mui/material';

import Button from '@components/Button';
import theme from '@styles/theme';

export const OutsideGridContainer = styled(Grid)({
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

export const ColGridContainer = styled(Grid)(({ theme: defaultTheme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  margin: 'auto',
  marginBottom: '2rem',
  [defaultTheme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const ItemGridContainer = styled(Grid)(({
  width: '100%',
}));

export const SecondItemGridContainer = styled(ItemGridContainer)(({ theme: defaultTheme }) => ({
  [defaultTheme.breakpoints.up('sm')]: {
    marginLeft: '2rem',
  },
}));

export const Title = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontWeight: 700,
  lineHeight: '52px',
  textAlign: 'left',
  marginLeft: '4rem',
  marginTop: '2rem',
  [defaultTheme.breakpoints.between('xs', 'lg')]: {
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
  lineHeight: '22px',
  textAlign: 'left',
  marginBottom: '2rem',
  fontSize: '24px',
}));

export const SectionDescription = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontWeight: 500,
  lineHeight: '22px',
  textAlign: 'left',
  whiteSpace: 'pre-line',
  marginBottom: '1rem',

  [defaultTheme.breakpoints.up('lg')]: {
    marginBottom: '2rem',
    fontSize: '16px',
  },
}));

export const EditorButton = styled(Button)({
  display: 'flex',
  justifyContent: 'center',
  margin: '4rem auto 0 auto',
  width: 'fit-content',
});

export const NextButton = styled(Button)({
  display: 'block',
  margin: '1rem auto 0',
  width: 'fit-content',
});

export const DividerLine = styled(Divider)(({ theme: defaultTheme }) => ({
  backgroundColor: theme.palette.text.primary,
  [defaultTheme.breakpoints.up('sm')]: {
    width: '1px',
    marginLeft: '2rem',
    orientation: 'vertical',
  },
  [defaultTheme.breakpoints.down('sm')]: {
    width: '100%',
    height: '1px',
    orientation: 'horizontal',
    marginLeft: 0,
    marginTop: '2rem',
    marginBottom: '2rem',
  },
}));
