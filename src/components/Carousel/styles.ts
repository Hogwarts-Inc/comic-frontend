import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { styled } from '@mui/material';
import { css } from '@mui/material';

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

const carouselButtonPrevMargin = css`
  left: 4%;
`;

const carouselButtonFirstMargin = css`
  left: 1%;
`;

const carouselButtonNextMargin = css`
  right: 4%;
`;

const carouselButtonLastMargin = css`
  right: 1%;
`;

export const CarouselButtonPrev = styled(KeyboardArrowLeftIcon)`
  ${carouselButtonPrevMargin},
  ${carouselButton},
`;

export const CarouselButtonFirst = styled(KeyboardDoubleArrowLeftIcon)`
  ${carouselButtonFirstMargin},
  ${carouselButton},
`;

export const CarouselButtonNext = styled(KeyboardArrowRightIcon)`
  ${carouselButtonNextMargin},
  ${carouselButton},
`;

export const CarouselButtonLast = styled(KeyboardDoubleArrowRightIcon)`
  ${carouselButtonLastMargin},
  ${carouselButton},
`;

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

export const ImagesContainer = styled('div')({
  width: '100%',
});
