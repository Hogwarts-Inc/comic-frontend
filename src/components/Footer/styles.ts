import { styled, Box, Typography } from '@mui/material';

import Button from '@components/Button';

export const BoxContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

export const BoxMui = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  height: '110px',
  width: '100%',
  background: theme.customPalette.gradient.main,
}));

export const TextButton = styled(Button)({
  boxShadow: 'none',
  background: 'transparent',
  marginRight: '1.7rem',
});

export const TypographyWhite = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
}));
