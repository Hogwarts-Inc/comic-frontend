import React from 'react';

import { Carousel } from '@components/Carousel/Carousel';

const images = [
  'https://via.placeholder.com/500',
  'https://via.placeholder.com/500',
  'https://via.placeholder.com/500',
];

export const Characters = (): JSX.Element => ( //wip, continue with new design
  <div>
    <Carousel images={images} displayMode="reduced" /> 
  </div>
);

export default Characters;
