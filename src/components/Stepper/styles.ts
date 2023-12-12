import { styled, Box, Button } from '@mui/material';

export const StepperContainer = styled(Box)({
  width: '100%',
});

export const ButtonRow = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: '1rem',
});

export const Spacer = styled(Box)({
  flex: '1 1 auto',
});

export const StyledButton = styled(Button)(({ theme }) => ({
  color: 'inherit',
  marginRight: theme.spacing(1),
}));
