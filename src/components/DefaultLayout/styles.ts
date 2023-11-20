import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import bg from '../Icons/texture.svg';

export const LayoutContainer = styled(Grid)({
  backgroundImage: `url(${bg.src})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});