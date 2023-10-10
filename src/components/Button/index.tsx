import { ButtonProps as ButtonPropsMui } from '@mui/material/Button';

import { ButtonMui } from './styles';

interface ButtonProps extends ButtonPropsMui {
  isSelected?: boolean;
  variantType?: 'default' | 'gradient';
  size?: 'small' | 'medium' | 'large';
}

const Button = (props: ButtonProps) => (
  <ButtonMui variant="contained" variantType={props.variantType} size={props.size} {...props}>
    {props.children}
  </ButtonMui>
);

export default Button;
