import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import TextureBackground from 'src/utils/texture';

export const StyledTextureBackground = styled(TextureBackground)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: -1,
});

export const LayoutContainer = styled('div')({
  position: 'relative',
  minHeight: '100vh',
  // maxWidth: '100vw',
});

export const StyledContainer = styled(Container)({
  position: 'relative',
  height: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  // maxWidth: '100vw', // This should ensure it's not constrained by the Container maxWidth
  // width: '100%', // Ensure width is set to 100%
  zIndex: 1,
});

export const StyledGrid = styled(Grid)({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
});
