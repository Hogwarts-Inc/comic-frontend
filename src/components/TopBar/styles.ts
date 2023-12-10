import { styled, Box, AppBar, Toolbar } from '@mui/material';

import Button from '@components/Button';

import LogoIcon from '../Icons/logo.svg'; //Logo preeliminar

export const StyledLogoIcon = styled(LogoIcon)({
  height: 'auto',
  width: '5rem',
});

export const AppBarMui = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  height: '70px',
  width: '100%',
  background: theme.customPalette.gradient.main,
}));

export const ToolbarMui = styled(Toolbar)({
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '1rem',
  paddingRight: '1rem',
});

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
});
