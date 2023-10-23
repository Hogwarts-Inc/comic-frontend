import React, { useState } from 'react';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useMediaQuery, useTheme } from '@mui/material';
import { useSwipeable } from 'react-swipeable';

import {
  Wrapper,
  CarouselButtonPrev,
  CarouselButtonFirst,
  CarouselButtonNext,
  CarouselButtonLast,
  ImagesContainer,
  CarouselContainer,
  CarouselSlot,
  CarouselSlotImage,
} from './styles';

interface CarouselProps {
  images: string[];
  displayMode?: 'full' | 'reduced';
}

export const Carousel = ({ images, displayMode = 'full' }: CarouselProps) => {
  const theme = useTheme();
  const isLargeScreen = !useMediaQuery(theme.breakpoints.only('xs'));
  const [index, setIndex] = useState(0);
  const numItems = images.length;
  const transformValue = `-${index * ((displayMode === 'reduced' ? 100 : 75) + 5)}%`;

  const handleNext = () => {
    setIndex(prevIndex => Math.min(prevIndex + 1, numItems - 1));
  };

  const handlePrev = () => {
    setIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleFirst = () => {
    setIndex(0);
  };

  const handleLast = () => {
    setIndex(numItems - 1);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    swipeDuration: 500,
    trackMouse: true,
  });

  return (
    <Wrapper {...handlers}>
      {index > 0 && (
        <CarouselButtonFirst lg={isLargeScreen} displayMode={displayMode} onClick={handleFirst}>
          <KeyboardDoubleArrowLeftIcon />
        </CarouselButtonFirst>
      )}
      {index > 0 && (
        <CarouselButtonPrev lg={isLargeScreen} onClick={handlePrev}>
          <KeyboardArrowLeftIcon />
        </CarouselButtonPrev>
      )}

      <ImagesContainer lg={isLargeScreen}>
        <CarouselContainer translateX={transformValue}>
          {images.map((url, idx) => (
            <CarouselSlot key={idx} displayMode={displayMode}>
              <CarouselSlotImage src={url} alt="Carousel Image" />
            </CarouselSlot>
          ))}
        </CarouselContainer>
      </ImagesContainer>

      {index < numItems - 1 && (
        <CarouselButtonNext lg={isLargeScreen} onClick={handleNext}>
          <KeyboardArrowRightIcon />
        </CarouselButtonNext>
      )}
      {index < numItems - 1 && (
        <CarouselButtonLast lg={isLargeScreen} displayMode={displayMode} onClick={handleLast}>
          <KeyboardDoubleArrowRightIcon />
        </CarouselButtonLast>
      )}
    </Wrapper>
  );
}
