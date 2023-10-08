import styled from '@emotion/styled';

export const Box = styled('div')({
  width: '1400px',
  height: '420px',
  position: 'relative',
  '@media (max-width: 768px)': {
    width: '380px',
    height: '200px',
  },
});

export const Placeholder = styled('div')({
  width: '1400px',
  height: '420px',
  position: 'absolute',
  borderRadius: '10px',
  border: '3px solid transparent',
  borderImage: 'linear-gradient(180deg, #40e0d0 0%, #7079be 62%, #ff0080 100%)',
  borderImageSlice: 1,
  '@media (max-width: 768px)': {
    width: '380px',
    height: '200px',
  },
});

export const Content = styled('div')({
  width: '950px',
  height: '230px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  left: '200px',
  top: '115px',
  '@media (max-width: 768px)': {
    width: '316px',
    height: '157.81px',
    left: '35px',
    top: '20px',
  },
});

export const Description = styled('p')({
  textAlign: 'center',
  fontSize: '42px',
  lineHeight: '52px',
  color: '#1e0e62',
  '@media (max-width: 768px)': {
    fontSize: '18px',
    lineHeight: '37px',
  },
});
