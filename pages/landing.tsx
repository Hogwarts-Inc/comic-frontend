import React from 'react';

import { Carousel } from '@components/Carousel/Carousel';

const slides = [
  'https://unsplash.it/475/205',
  'https://unsplash.it/476/205',
  'https://unsplash.it/477/205',
  'https://unsplash.it/478/205',
  'https://unsplash.it/479/205',
];

const Landing = () => (
  <div className="App">
    <Carousel images={slides} />
  </div>
);

export default Landing;
