import React, { useReducer } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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

type CarouselAction = { type: Direction; numItems: number } | { type: 'stopSliding' };

interface CarouselProps {
  images: string[];
}

const getOrder = (index: number, pos: number, numItems: number): number =>
  index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;

export const Carousel = ({ images }: CarouselProps) => {
  const numItems = images.length;

  const initialState: CarouselState = {
    pos: numItems - 1,
    sliding: false,
    dir: NEXT,
  };

  const reducer = (state: CarouselState, action: CarouselAction): CarouselState => {
    switch (action.type) {
      case PREV:
        return {
          ...state,
          dir: PREV,
          sliding: true,
          pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1,
        };
      case NEXT:
        return {
          ...state,
          dir: NEXT,
          sliding: true,
          pos: state.pos === action.numItems - 1 ? 0 : state.pos + 1,
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
        <ArrowBackIosIcon
          className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
          onClick={() => slide(PREV)}
        />
        <div className={`${styles.carouselContainer} ${styles[state.dir]} ${state.sliding ? styles.sliding : ''}`}>
          {images.map((url, index) => (
            <div key={url} className={styles.carouselSlot} style={{ order: getOrder(index, state.pos, numItems) }}>
              <img src={url} />
            </div>
          ))}
        </div>
        <ArrowForwardIosIcon
          className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
          onClick={() => slide(NEXT)}
        />
      </div>
    </div>
  );
};
