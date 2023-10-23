/* eslint-disable react/destructuring-assignment */
import React from 'react';

import { ButtonProps as ButtonPropsMui } from '@mui/material/Button';

import { ButtonMui, Loader } from './styles';

interface ButtonProps extends ButtonPropsMui {
  isSelected?: boolean;
  variantType?: 'default' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

function Button({ variantType, size, isSelected, isLoading, ...props }: ButtonProps) {
  return (
    <ButtonMui
      variant="contained"
      variantType={variantType}
      size={size}
      isSelected={isSelected}
      {...props}
      onClick={isLoading ? undefined : props.onClick}>
      {isLoading && <Loader />}
      {props.children}
    </ButtonMui>
  );
}

export default Button;
