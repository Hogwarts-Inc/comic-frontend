import React, { useState } from 'react';

import { useSwipeable } from 'react-swipeable';

import {
  Wrapper,
  CarouselButtonPrev,
  CarouselContainer,
  ImagesContainer,
  CarouselSlot,
  CarouselButtonFirst,
  CarouselButtonLast,
  CarouselButtonNext,
} from './styles';

interface CarouselProps {
  images: string[];
}

export function Carousel({ images }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const numItems = images.length;

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
      {index > 0 && <CarouselButtonFirst onClick={handleFirst} />}
      {index > 0 && <CarouselButtonPrev onClick={handlePrev} />}

      <ImagesContainer>
        <CarouselContainer index={index}>
          {images.map(url => (
            <CarouselSlot key={url}>
              <img src={url} />
            </CarouselSlot>
          ))}
        </CarouselContainer>
      </ImagesContainer>

      {index < numItems - 1 && <CarouselButtonNext onClick={handleNext} />}
      {index < numItems - 1 && <CarouselButtonLast onClick={handleLast} />}
    </Wrapper>
  );
}
