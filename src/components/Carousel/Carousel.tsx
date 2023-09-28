import React, { useReducer } from 'react';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useSwipeable } from 'react-swipeable';

import styles from './carousel.module.css';

const NEXT = 'next';
const PREV = 'prev';

type Direction = typeof PREV | typeof NEXT;

interface CarouselState {
  pos: number;
  sliding: boolean;
  dir: Direction;
}

type CarouselAction =
  | { type: Direction; numItems: number }
  | { type: 'stopSliding' }
  | { type: 'goToFirst' | 'goToLast'; numItems: number };

interface CarouselProps {
  images: string[];
}

const getOrder = (index: number, pos: number, numItems: number): number => {
  let order = index - pos;
  if (order < 0) order += numItems; 
  return order;
};

export const Carousel = ({ images }: CarouselProps) => {
  const numItems = images.length;

  const initialState: CarouselState = {
    pos: 0,
    sliding: false,
    dir: NEXT,
  };

  const reducer = (state: CarouselState, action: CarouselAction): CarouselState => {
    switch (action.type) {
      case PREV:
        if (state.pos === 0) {
          return state;  
        }
        return {
          ...state,
          dir: PREV,
          sliding: true,
          pos: state.pos - 1,
        };
      case NEXT:
        if (state.pos === action.numItems - 1) return state;
        return {
          ...state,
          dir: NEXT,
          sliding: true,
          pos: state.pos + 1,
        };
      case 'goToFirst':
        return {
          ...state,
          dir: PREV,
          sliding: true,
          pos: 0,
        };
      case 'goToLast':
        return {
          ...state,
          dir: NEXT,
          sliding: true,
          pos: action.numItems - 1,
        };
      case 'stopSliding':
        return { ...state, sliding: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const slide = (dir: Direction) => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: 'stopSliding' });
    }, 50);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...handlers}>
      <div className={styles.wrapper}>
        {state.pos != 0 && <KeyboardDoubleArrowLeftIcon
          className={`${styles.carouselButton} ${styles.carouselButtonFirst}`}
          onClick={() => dispatch({ type: 'goToFirst', numItems })}
        />}
        <KeyboardArrowLeftIcon
          className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
          onClick={() => slide(PREV)}
        />

        <div className={styles.imagesContainer}>
          <div className={`${styles.carouselContainer} ${styles[state.dir]} ${state.sliding ? styles.sliding : ''}`}>
            {images.map((url, index) => (
              <div key={url} className={styles.carouselSlot} style={{ order: getOrder(index, state.pos, numItems) }}>
                <img src={url} />
              </div>
            ))}
          </div>
        </div>

        <KeyboardArrowRightIcon
          className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
          onClick={() => slide(NEXT)}
        />
        {state.pos != (numItems - 1) && <KeyboardDoubleArrowRightIcon
          className={`${styles.carouselButton} ${styles.carouselButtonLast}`}
          onClick={() => dispatch({ type: 'goToLast', numItems })}
        />}
      </div>
    </div>
  );
};
