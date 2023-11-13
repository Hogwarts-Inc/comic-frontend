import { styled, Box, Button } from '@mui/material';

export const StepperContainer = styled(Box)({
  width: '100%',
});

export const ButtonRow = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: 2,
});

export const Spacer = styled(Box)({
  flex: '1 1 auto',
});

export const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: 'inherit',
}));
