import { styled, Box, AppBar } from '@mui/material';

import Button from '@components/Button';

import LogoIcon from '../Icons/logo.svg'; //Logo preeliminar

export const StyledLogoIcon = styled(LogoIcon)({
  height: '4rem',
  width: 'auto',
});

export const AppBarMui = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  height: '6rem',
  width: '100%',
  background: theme.customPalette.gradient.main,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1rem',
}));

export const ButtonSignUp = styled(Button)(({ theme }) => ({
  background: 'transparent',
  margin: '1rem',
  border: `1px solid ${theme.palette.common.white}`,
}));

export const ButtonLogIn = styled(Button)({
  boxShadow: 'none',
  background: 'transparent',
  margin: '1rem',
});

export const ButtonBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  '&:hover': {
    cursor: 'pointer',
  },
  alignItems: 'center',
});
