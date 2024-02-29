import React, { useEffect, useState } from 'react';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Grid, Hidden, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const { push } = useRouter();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [index, setIndex] = useState(0);
  const numItems = images.length;

  const itemWidth = (displayMode === 'reduced' ? 100 : isLargeScreen ? 45 : 75);
  const transformValue = `-${index * (itemWidth + 1)}%`;

  useEffect(() => {
    setCurrentIndex(index);
  }, [index, setCurrentIndex]);

  const handleNext = () => {
    const offset = isLargeScreen ? 2 : 1;
    setIndex(prevIndex => Math.min(prevIndex + 1, numItems - offset));
  };

  const handlePrev = () => {
    setIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleFirst = () => {
    setIndex(0);
  };

  const handleLast = () => {
    setIndex(numItems - 2);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    swipeDuration: 500,
    trackMouse: true,
  });

  return (
    <Wrapper {...handlers}>
      <Grid container item>
        <Hidden only={['xs', 'sm', 'md']}>
          <Grid container item lg={1} justifyContent="flex-end">
            {index > 0 && (
              <CarouselButtonFirst displayMode={displayMode} onClick={handleFirst}>
                <KeyboardDoubleArrowLeftIcon />
              </CarouselButtonFirst>
            )}
          </Grid>
          <Grid container item lg={1}>
            {index > 0 && (
              <CarouselButtonPrev onClick={handlePrev}>
                <KeyboardArrowLeftIcon />
              </CarouselButtonPrev>
            )}
          </Grid>
        </Hidden>

        <Grid item lg={8}>
          <ImagesContainer>
            <CarouselContainer translateX={transformValue}>
              {images.map(({ url, id }) => (
                <CarouselSlot
                  key={url}
                  displayMode={displayMode}
                  isClickable={!!id}
                  onClick={() => id && push(`${Route.visualizer}/${id}`)}>
                  <CarouselSlotImage src={url} displayMode={displayMode} alt="Carousel Image" />
                </CarouselSlot>
              ))}
            </CarouselContainer>
          </ImagesContainer>
        </Grid>
        <Hidden only={['xs', 'sm', 'md']}>
          <Grid container item lg={1} justifyContent="flex-end">
            {index < numItems - 2 && (
              <CarouselButtonNext onClick={handleNext}>
                <KeyboardArrowRightIcon />
              </CarouselButtonNext>
            )}
          </Grid>
          <Grid container item lg={1}>
            {index < numItems - 2 && (
              <CarouselButtonLast displayMode={displayMode} onClick={handleLast}>
                <KeyboardDoubleArrowRightIcon />
              </CarouselButtonLast>
            )}
          </Grid>
        </Hidden>
      </Grid>
    </Wrapper>
  );
};
