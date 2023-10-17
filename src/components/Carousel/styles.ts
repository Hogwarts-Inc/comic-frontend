import styled from '@emotion/styled';

interface CarouselProps {
  lg?: boolean;
  translateX?: string;
  displayMode?: 'full' | 'reduced';
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

export const CarouselButtonPrev = styled(CarouselButton)<CarouselProps>(props => ({
  display: props.lg ? 'block' : 'none',
  left: '4%',
}));

export const CarouselButtonFirst = styled(CarouselButton)<CarouselProps>(props => ({
  display: props.lg && props.displayMode === 'full' ? 'block' : 'none',
  left: '1%',
}));

export const CarouselButtonNext = styled(CarouselButton)<CarouselProps>(props => ({
  display: props.lg ? 'block' : 'none',
  right: '4%',
}));

export const CarouselButtonLast = styled(CarouselButton)<CarouselProps>(props => ({
  display: props.lg && props.displayMode === 'full' ? 'block' : 'none',
  right: '1%',
}));

export const ImagesContainer = styled('div')<CarouselProps>(props => ({
  position: 'relative',
  width: props.lg ? '80%' : '100%',
  height: '100%',
  margin: '0 auto',
  overflow: 'hidden',
}));

export const CarouselContainer = styled('div')<CarouselProps>(props => ({
  position: 'relative',
  display: 'flex',
  transition: 'transform 0.4s ease',
  transform: props.translateX ? `translateX(${props.translateX})` : 'none',
}));

export const CarouselSlot = styled('div')<CarouselProps>(props => ({
  flex: '1 0 100%',
  flexBasis: props.displayMode === 'reduced' ? '100%' : '75%', 
  marginRight: '5%',
}));

export const CarouselSlotImage = styled('img')({
  width: '100%',
});
