import styled from '@emotion/styled';

interface StyledProps {
  lg?: boolean;
}

export const Box = styled('div')({
  width: '100%',
  height: '420px',
  position: 'relative',
});

export const Placeholder = styled('div')<StyledProps>(props => ({
  width: props.lg ? '1400px' : '380px',
  height: props.lg ? '420px' : '200px',
  position: 'absolute',
  borderRadius: '10px',
  border: '3px solid transparent',
  borderImage: 'linear-gradient(180deg, #40e0d0 0%, #7079be 62%, #ff0080 100%)',
  borderImageSlice: 1,
}));

export const Content = styled('div')<StyledProps>(props => ({
  width: props.lg ? '950px' : '316px',
  height: props.lg ? '230px' : '157.81px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  left: props.lg ? '200px' : '35px',
  top: props.lg ? '115px' : '20px',
}));

export const Description = styled('p')<StyledProps>(props => ({
  textAlign: 'center',
  fontSize: props.lg ? '42px' : '18px',
  lineHeight: props.lg ? '52px' : '37px',
  color: '#1e0e62',
}));
