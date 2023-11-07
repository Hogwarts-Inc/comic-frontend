import { styled } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
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
});

export const StyledContainer = styled(Container)({
  position: 'relative',
  height: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  zIndex: 1,
});

export const StyledGrid = styled(Grid)({
  flex: 1,
});

export const StyledGridItem = styled(Grid)({
  flex: 1,
});
