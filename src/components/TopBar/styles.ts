import { styled, Box, AppBar, Toolbar } from '@mui/material';

import Button from '@components/Button';

export const AppBarMui = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  height: '70px',
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
