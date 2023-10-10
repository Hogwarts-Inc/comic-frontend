import { styled } from '@mui/material';

interface StyledProps {
  lg?: boolean;
}

export const Box = styled('div')({
  height: '420px',
  position: 'relative',
  width: '100%',
});

export const Placeholder = styled('div')<StyledProps>(({ theme, lg }) => ({
  border: '3px solid transparent',
  borderImage: theme.customPalette.gradientBox.main,
  borderImageSlice: 1,
  borderRadius: '10px',
  height: lg ? '420px' : '200px',
  position: 'absolute',
  width: lg ? '1400px' : '380px',
}));

export const Content = styled('div')<StyledProps>(props => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: props.lg ? '230px' : '158px',
  left: props.lg ? '200px' : '35px',
  position: 'absolute',
  top: props.lg ? '90px' : '10px',
  width: props.lg ? '950px' : '316px',
}));

export const Description = styled('p')<StyledProps>(({ theme, lg }) => ({
  color: theme.palette.text.primary,
  fontSize: lg ? '42px' : '18px',
  fontWeight: 700,
  lineHeight: lg ? '52px' : '37px',
  textAlign: 'center',
}));
