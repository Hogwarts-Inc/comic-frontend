import styled from '@emotion/styled';

import theme from '../../../../styles/theme';

interface StyledProps {
  lg?: boolean;
}

export const Box = styled('div')({
  height: '420px',
  position: 'relative',
  width: '100%',
});

export const Placeholder = styled('div')<StyledProps>(props => ({
  border: '3px solid transparent',
  borderImage: theme.customPalette.gradientBox.main,
  borderImageSlice: 1,
  borderRadius: '10px',
  height: props.lg ? '420px' : '200px',
  position: 'absolute',
  width: props.lg ? '1400px' : '380px',
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

export const Description = styled('p')<StyledProps>(props => ({
  color: theme.palette.text.primary,
  fontSize: props.lg ? '42px' : '18px',
  fontWeight: 700,
  lineHeight: props.lg ? '52px' : '37px',
  textAlign: 'center',
}));
