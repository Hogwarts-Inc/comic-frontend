import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import bg from '../Icons/texture.svg';

export const LayoutContainer = styled(Grid)({
  backgroundImage: `url(${bg.src})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export const ContentContainer = styled('div')({
  display: 'flex',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
});

export const ChildContainer = styled('div')({
  display: 'flex',
  flex: 1,
});
