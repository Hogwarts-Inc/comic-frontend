import { ButtonProps as ButtonPropsMui } from '@mui/material/Button';

import { ButtonMui } from './styles';

interface ButtonProps extends ButtonPropsMui {
  isSelected?: boolean;
}

const Button = (props: ButtonProps) => (
  <ButtonMui variant="contained" {...props}>
    {props.children}
  </ButtonMui>
);

export default Button;
