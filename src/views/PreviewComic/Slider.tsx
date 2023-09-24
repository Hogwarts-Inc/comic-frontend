import { Carousel } from './Carousel';
const slides = [
  'https://unsplash.it/475/205',
  'https://unsplash.it/476/205',
  'https://unsplash.it/477/205',
  'https://unsplash.it/478/205',
  'https://unsplash.it/479/205',
];

export const Slider = () => (
  <Carousel>
    {slides.map(slide => (
      <img src={slide} key={slide} />
    ))}
  </Carousel>
);
