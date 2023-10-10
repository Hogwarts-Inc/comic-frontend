import { CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

import theme from '../../styles/theme';

interface ButtonOwnProps {
  isSelected?: boolean;
  variantType?: 'default' | 'gradient';
  size?: 'small' | 'medium' | 'large';
}

const sizeStyles: Record<'small' | 'medium' | 'large', CSSObject> = {
  small: {
    fontSize: '0.6rem',
    padding: '3px 8px',
    color: theme.palette.common.white,
  },
  medium: {
    fontSize: '0.8rem',
    padding: '4px 12px',
    color: theme.palette.common.white,
  },
  large: {
    fontSize: '1rem',
    padding: '24px 60px',
    color: theme.palette.common.white,
  },
};

export const ButtonMui = styled(Button)<ButtonOwnProps>(({ isSelected, variantType, size = 'medium' }) => {
  let styles: CSSObject = {
    background: theme.customPalette.violet.main,
    backgroundColor: isSelected ? theme.customPalette.violetDark.main : theme.customPalette.violet.main,
    borderRadius: '20px',
    boxShadow: `0px 4px 4px 0px ${theme.customPalette.blackTransparent.main}`,
    '&:hover': {
      background: theme.customPalette.violetDark.main,
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
      background: theme.customPalette.gradient.main,
      '&:before': {
        background: theme.customPalette.gradientReverse.main,
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
  };
  return styles;
});
