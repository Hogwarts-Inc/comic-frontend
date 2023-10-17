import { ButtonProps as ButtonPropsMui } from '@mui/material/Button';

import { ButtonMui, Loader } from './styles';

interface ButtonProps extends ButtonPropsMui {
  isSelected?: boolean;
  variantType?: 'default' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

const Button = (props: ButtonProps) => (
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

export default Button;
