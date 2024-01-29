import { styled, Box, Typography } from '@mui/material';

import Button from '@components/Button';

export const BoxMui = styled(Box)(({ theme }) => ({
  height: 'fit-content',
  padding: '1rem',
  background: theme.customPalette.gradient.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
}));

export const TextButton = styled(Button)({
  boxShadow: 'none',
  background: 'transparent',
});

export const TypographyWhite = styled(Typography)(({ theme, width }) => ({
  color: theme.palette.common.white,
  fontSize: width === 'sm' ? '0.5rem' : '0.8rem',
  lineHeight: '1.75',
}));

export const TypographyDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: '0.8rem',
}));
