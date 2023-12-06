import { Button, Typography, styled } from '@mui/material';

import NotFoundIcon from '../../components/Icons/404.svg';

export const StyledContainer = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const StyledNotFoundIcon = styled(NotFoundIcon)({
  height: 'auto',
  width: '80%',
});

export const StyledTypography = styled(Typography)({
  marginTop: '2rem',
});

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginTop: '2rem',
}));
