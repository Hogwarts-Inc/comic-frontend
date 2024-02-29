import styled from '@emotion/styled';

interface CarouselProps {
  translateX?: string;
  displayMode?: 'full' | 'reduced';
  isClickable?: boolean;
}

export const Wrapper = styled('div')({
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
});

export const CarouselButton = styled('div')<CarouselProps>({
  cursor: 'pointer',
  height: 'auto',
  maxHeight: '50px',
  maxWidth: '50px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '3%',
});

export const CarouselButtonPrev = styled(CarouselButton)({ width: '1.5rem' });
export const CarouselButtonFirst = styled(CarouselButton)({ width: '1.5rem' });
export const CarouselButtonNext = styled(CarouselButton)({ width: '1.5rem' });
export const CarouselButtonLast = styled(CarouselButton)({ width: '1.5rem' });

export const ImagesContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  margin: '0 auto',
  overflow: 'hidden',
});

export const CarouselContainer = styled('div')<CarouselProps>(props => ({
  position: 'relative',
  display: 'flex',
  transition: 'transform 0.4s ease',
  transform: props.translateX ? `translateX(${props.translateX})` : 'none',
}));

export const CarouselSlot = styled('div')<CarouselProps>(({ displayMode, isClickable }) => ({
  flex: '1 0 auto',
  flexBasis: displayMode === 'reduced' ? '100%' : '75%',
  '@media (min-width: 1280px)': {
    flexBasis: '45%',
  },
  marginRight: '1%',
  '&:hover': {
    cursor: isClickable ? 'pointer' : 'auto',
  },
}));

export const CarouselSlotImage = styled('img')<CarouselProps>(({ displayMode }) => ({
  border: displayMode !== 'reduced' ? '2px solid #000' : undefined,
  width: '100%',
}));
