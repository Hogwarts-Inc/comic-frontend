import { Divider, Grid, Typography, styled } from '@mui/material';

import Button from '@components/Button';
import theme from '@styles/theme';

export const OutsideGridContainer = styled(Grid)({
  border: '3px solid transparent',
  borderImage: theme.customPalette.gradientBox.main,
  borderImageSlice: 1,
  borderRadius: '10px',

  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: '10rem',
  marginTop: '2rem',
  width: '100%',
});

export const ColGridContainer = styled(Grid)(({ theme: defaultTheme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  margin: 'auto',
  marginBottom: '2rem',
  width: '100%',
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
  marginLeft: '4rem',
  marginTop: '2rem',
  textAlign: 'left',
  [defaultTheme.breakpoints.between('xs', 'lg')]: {
    fontSize: '35px',
    marginBottom: '2rem',
  },
  [defaultTheme.breakpoints.up('lg')]: {
    fontSize: '42px',
    marginBottom: '2rem',
  },
}));

export const SectionTitle = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '22px',
  marginBottom: '2rem',
  textAlign: 'left',
}));

export const SectionDescription = styled(Typography)(({ theme: defaultTheme }) => ({
  color: defaultTheme.palette.text.primary,
  fontWeight: 500,
  lineHeight: '22px',
  marginBottom: '1rem',
  textAlign: 'left',
  whiteSpace: 'pre-line',
  [defaultTheme.breakpoints.up('lg')]: {
    fontSize: '16px',
    marginBottom: '2rem',
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
    marginLeft: '2rem',
    orientation: 'vertical',
    width: '1px',
  },
  [defaultTheme.breakpoints.down('sm')]: {
    height: '1px',
    marginBottom: '2rem',
    marginLeft: 0,
    marginTop: '2rem',
    orientation: 'horizontal',
    width: '100%',
  },
}));
