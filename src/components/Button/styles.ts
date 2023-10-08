import styled from '@emotion/styled';
import Button from '@mui/material/Button';

import { Colors } from '@styles/colors';

export const ButtonMui = styled(Button, {
  shouldForwardProp: propName => propName !== 'isSelected',
})<{ isSelected?: boolean }>(({ isSelected }) => ({
  borderRadius: '20px',
  background: Colors.violet,
  backgroundColor: isSelected ? Colors.violetDark : Colors.violet,
  fontSize: '0.8rem',
  textTransform: 'none',
  padding: '4px 12px',
  minWidth: 0,
  boxShadow: `0px 4px 4px 0px ${Colors.blackTransparent}`,
  '&:hover': {
    background: Colors.violetDark,
  },
}));
