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

function Button(props: ButtonProps) {
  return (
    <ButtonMui
      variant="contained"
      variantType={props.variantType}
      size={props.size}
      {...props}
      onClick={props.isLoading ? undefined : props.onClick}>
      {props.isLoading && <Loader />}
      {props.children}
    </ButtonMui>
  );
}

export default Button;
