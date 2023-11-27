import { Grid, TextField, Typography, styled } from '@mui/material';

import Button from '@components/Button';
import theme from '@styles/theme';

const commonTextFieldStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid transparent',
      borderImage: theme.customPalette.gradientBox.main,
      borderImageSlice: 1,
      borderRadius: '1px',
    },
    '&:hover fieldset': {
      borderColor: theme.customPalette.gradientBox.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.customPalette.gradientBox.main,
    },
  },
};

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

export const TitleTextField = styled(TextField)(({ theme: defaultTheme }) => ({
  ...commonTextFieldStyles,
  color: defaultTheme.palette.text.primary,
  marginBottom: '2rem',
  marginLeft: '4rem',
  width: '70%',
}));

export const DescriptionTextField = styled(TextField)({
  ...commonTextFieldStyles,
  marginBottom: '2rem',
  marginLeft: '4rem',
  width: '70%',
});

export const NextButton = styled(Button)({
  marginBottom: '2rem',
});
