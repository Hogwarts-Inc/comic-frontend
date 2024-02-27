import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LayoutContainer = styled(Grid)({
  backgroundImage: 'url(/texture.svg)',
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
  justifyContent: 'center',
});
