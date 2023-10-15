import { CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { LoadingSpinner } from 'baseui/button/styled-components';

import { Colors } from '@styles/colors';

interface ButtonOwnProps {
  isSelected?: boolean;
  variantType?: 'default' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

const sizeStyles: Record<'small' | 'medium' | 'large', CSSObject> = {
  small: {
    fontSize: '0.6rem',
    padding: '3px 8px',
  },
  medium: {
    fontSize: '0.8rem',
    padding: '4px 12px',
  },
  large: {
    fontSize: '1rem',
    padding: '24px 60px',
  },
};

export const ButtonMui = styled(Button)<ButtonOwnProps>(({ isSelected, variantType, size = 'medium', isLoading }) => {
  let styles: CSSObject = {
    background: Colors.violet,
    backgroundColor: isSelected ? Colors.violetDark : Colors.violet,
    borderRadius: '20px',
    boxShadow: `0px 4px 4px 0px ${Colors.blackTransparent}`,
    '&:hover': {
      background: Colors.violetDark,
    },
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    textTransform: 'none',
    transition: 'all 0.5s ease-in-out',
  };

  if (variantType === 'gradient') {
    styles = {
      ...styles,
      position: 'relative',
      background: Colors.gradient,
      '&:before': {
        background: Colors.gradientReverse,
        bottom: '0',
        content: '""',
        left: '0',
        opacity: '0',
        position: 'absolute',
        right: '0',
        top: '0',
        transition: 'opacity 0.5s ease-in-out',
        zIndex: '-1',
      },
      '&:hover:before': {
        opacity: '1',
      },
      borderRadius: '100px',
    };
  }

  styles = {
    ...styles,
    ...sizeStyles[size ?? 'medium'],
    ...(isLoading ? { color: 'transparent', transition: undefined } : {}),
  };
  return styles;
});

export const Loader = styled(LoadingSpinner)({
  position: 'absolute',
});
