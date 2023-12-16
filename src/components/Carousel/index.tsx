import React, { useEffect, useState } from 'react';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Grid, Hidden } from '@mui/material';
import { useRouter } from 'next/router';
import { useSwipeable } from 'react-swipeable';

import { Route } from 'src/constants/routes';

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
  images: { url: string; id?: number }[];
  displayMode?: 'full' | 'reduced';
  // eslint-disable-next-line no-unused-vars
  setCurrentIndex?: (index: number) => void;
}

export const Carousel = ({ images, displayMode = 'full', setCurrentIndex = () => {} }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const { push } = useRouter();
  const numItems = images.length;
  const transformValue = `-${index * ((displayMode === 'reduced' ? 100 : 75) + 5)}%`;

  useEffect(() => {
    setCurrentIndex(index);
  }, [index, setCurrentIndex]);

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
      <Grid container spacing={2}>
        <Grid item lg={1} xs={12}>
          <Hidden only={['xs', 'sm', 'md']}>
            {index > 0 && (
              <CarouselButtonFirst displayMode={displayMode} onClick={handleFirst}>
                <KeyboardDoubleArrowLeftIcon />
              </CarouselButtonFirst>
            )}
          </Hidden>
        </Grid>

        <Grid item lg={1} xs={12}>
          <Hidden only={['xs', 'sm', 'md']}>
            {index > 0 && (
              <CarouselButtonPrev onClick={handlePrev}>
                <KeyboardArrowLeftIcon />
              </CarouselButtonPrev>
            )}
          </Hidden>
        </Grid>

        <Grid item lg={8} xs={12}>
          <ImagesContainer>
            <CarouselContainer translateX={transformValue}>
              {images.map(({ url, id }) => (
                <CarouselSlot
                  key={url}
                  displayMode={displayMode}
                  isClickable={!!id}
                  onClick={() => id && push(`${Route.visualizer}/${id}`)}>
                  <CarouselSlotImage src={url} alt="Carousel Image" />
                </CarouselSlot>
              ))}
            </CarouselContainer>
          </ImagesContainer>
        </Grid>

        <Grid item lg={1} xs={12}>
          <Hidden only={['xs', 'sm', 'md']}>
            {index < numItems - 1 && (
              <CarouselButtonNext onClick={handleNext}>
                <KeyboardArrowRightIcon />
              </CarouselButtonNext>
            )}
          </Hidden>
        </Grid>

        <Grid item lg={1} xs={12}>
          <Hidden only={['xs', 'sm', 'md']}>
            {index < numItems - 1 && (
              <CarouselButtonLast displayMode={displayMode} onClick={handleLast}>
                <KeyboardDoubleArrowRightIcon />
              </CarouselButtonLast>
            )}
          </Hidden>
        </Grid>
      </Grid>
    </Wrapper>
  );
};
