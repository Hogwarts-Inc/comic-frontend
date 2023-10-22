import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { styled, css } from '@mui/material';

export const Wrapper = styled('div')({
  overflow: 'hidden',
  position: 'relative',
});

const carouselButton = css`
  cursor: pointer;
  height: auto;
  max-height: 50px;
  max-width: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3%;
  @media (max-width: 768px) {
    display: none;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 4%;
    max-width: 30px;
    max-height: 30px;
  }
`;

export const CarouselButtonPrev = styled(KeyboardArrowLeftIcon)({
  ...carouselButton,
  left: '4%',
});

export const CarouselButtonFirst = styled(KeyboardDoubleArrowLeftIcon)({
  ...carouselButton,
  left: '1%',
});

export const CarouselButtonNext = styled(KeyboardArrowRightIcon)({
  ...carouselButton,
  right: '4%',
});

export const CarouselButtonLast = styled(KeyboardDoubleArrowRightIcon)({
  ...carouselButton,
  right: '1%',
});

export const CarouselContainer = styled('div')<{ index: number }>(({ index }) => ({
  position: 'relative',
  display: 'flex',
  transition: ' transform 0.4s ease',
  transform: `translateX(-${index * (75 + 5)}%`,
}));

export const CarouselSlot = styled('div')({
  flex: '1 0 100%',
  flexBasis: '75%',
  marginRight: '5%',
});

export const ImagesContainer = styled('div')({
  width: '100%',
});
