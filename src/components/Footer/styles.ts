import { styled, Box, Typography } from '@mui/material';

export const BoxMui = styled(Box)(({ theme }) => ({
  height: 'fit-content',
  padding: '1rem',
  background: theme.customPalette.gradient.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
}));

export const TypographyWhiteLink = styled('a')(({ theme, width }) => ({
  color: theme.palette.common.white,
  fontSize: width === 'sm' ? '0.5rem' : '0.8rem',
  fontWeight: 'bold',
}));

export const TypographyWhite = styled(Typography)(({ theme, width }) => ({
  color: theme.palette.common.white,
  fontSize: width === 'sm' ? '0.5rem' : '0.8rem',
  fontWeight: 'bold',
}));
