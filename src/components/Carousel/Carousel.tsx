import React, { CSSProperties, useState } from 'react';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useSwipeable } from 'react-swipeable';

import styles from './carousel.module.css';

interface CarouselProps {
  images: string[];
}

export const Carousel = ({ images }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const numItems = images.length;

  const transformStyle = {
    '--translateX': `-${index * (72 + 2)}%`,
  } as CSSProperties;

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
    <div className={styles.wrapper} {...handlers}>
      {index > 0 && (
        <KeyboardDoubleArrowLeftIcon
          className={`${styles.carouselButton} ${styles.carouselButtonFirst}`}
          onClick={handleFirst}
        />
      )}
      {index > 0 && (
        <KeyboardArrowLeftIcon
          className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
          onClick={handlePrev}
        />
      )}

      <div className={styles.imagesContainer}>
        <div className={`${styles.carouselContainer} ${styles.transform}`} style={transformStyle}>
          {images.map((url, idx) => (
            <div key={idx} className={styles.carouselSlot}>
              <img src={url} />
            </div>
          ))}
        </div>
      </div>

      {index < numItems - 1 && (
        <KeyboardArrowRightIcon
          className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
          onClick={handleNext}
        />
      )}
      {index < numItems - 1 && (
        <KeyboardDoubleArrowRightIcon
          className={`${styles.carouselButton} ${styles.carouselButtonLast}`}
          onClick={handleLast}
        />
      )}
    </div>
  );
};
