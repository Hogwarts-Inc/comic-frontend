import { styled } from '@mui/material';

export const Separator = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.background.default}`,
  background: theme.palette.common.white,
  boxShadow: `0px 35px 4px 0px ${theme.customPalette.blackTransparent.main}`,
  width: '1.625rem',
}));
