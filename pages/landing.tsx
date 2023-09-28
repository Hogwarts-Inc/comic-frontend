import React from 'react';

import { Carousel } from '@components/Carousel/Carousel';

const slides = [
  'https://picsum.photos/id/1/2000',
  'https://picsum.photos/id/200/2000',
  'https://picsum.photos/id/300/2000',
  'https://picsum.photos/id/400/2000',
  'https://picsum.photos/id/500/2000'
];

const Landing = () => (
  <div className="App">
    <Carousel images={slides} />
  </div>
);

export default Landing;
