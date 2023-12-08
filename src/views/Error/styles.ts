import { Button, Typography, styled } from '@mui/material';

import UnauthorizedIcon from '../../components/Icons/401.svg';
import ForbiddenIcon from '../../components/Icons/403.svg';
import NotFoundIcon from '../../components/Icons/404.svg';
import InternalServerErrorIcon from '../../components/Icons/500.svg';

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

export const StyledForbiddenIcon = styled(ForbiddenIcon)({
  height: 'auto',
  width: '80%',
});

export const StyledUnauthorizedIcon = styled(UnauthorizedIcon)({
  height: 'auto',
  width: '80%',
});

export const StyledInternalServerErrorIcon = styled(InternalServerErrorIcon)({
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
