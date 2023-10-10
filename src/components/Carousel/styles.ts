import styled from '@emotion/styled';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export const Wrapper = styled('div')({
  overflow: 'hidden',
  position: 'relative',
});

export const CarouselButtonPrev = styled(KeyboardArrowLeftIcon)({
  cursor: 'pointer',
  height: 'auto',
  maxHeight: '50px',
  maxWidth: '50px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '3%',
  '@media (max-width: 768px)': {
    display: 'none',
  },
  '@media (min-width: 769px) and (max-width: 1024px)': {
    width: '4%',
    maxWidth: '30px',
    maxHeight: '30px',
  },
  left: '4%',
});

export const CarouselButtonFirst = styled(KeyboardDoubleArrowLeftIcon)({
  cursor: 'pointer',
  height: 'auto',
  maxHeight: '50px',
  maxWidth: '50px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '3%',
  '@media (max-width: 768px)': {
    display: 'none',
  },
  '@media (min-width: 769px) and (max-width: 1024px)': {
    width: '4%',
    maxWidth: '30px',
    maxHeight: '30px',
  },
  left: '1%',
});

export const CarouselButtonNext = styled(KeyboardArrowRightIcon)({
  cursor: 'pointer',
  height: 'auto',
  maxHeight: '50px',
  maxWidth: '50px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '3%',
  '@media (max-width: 768px)': {
    display: 'none',
  },
  '@media (min-width: 769px) and (max-width: 1024px)': {
    width: '4%',
    maxWidth: '30px',
    maxHeight: '30px',
  },
  right: '4%',
});

export const CarouselButtonLast = styled(KeyboardDoubleArrowRightIcon)({
  cursor: 'pointer',
  height: 'auto',
  maxHeight: '50px',
  maxWidth: '50px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '3%',
  '@media (max-width: 768px)': {
    display: 'none',
  },
  '@media (min-width: 769px) and (max-width: 1024px)': {
    width: '4%',
    maxWidth: '30px',
    maxHeight: '30px',
  },
  right: '1%',
});

export const CarouselContainer = styled('div')({
  position: 'relative',
  display: 'flex',
  transition: ' transform 0.4s ease',
  transform: 'translateX(var(--translateX))',
});

export const CarouselSlot = styled('div')({
  flex: '1 0 100%',
  flexBasis: '75%',
  marginRight: '5%',
});

// export const CarouselImage = styled(KeyboardDoubleArrowRightIcon)({
//   right: '1%',
// });

export const ImagesContainer = styled('div')({
  width: '100%',
});
