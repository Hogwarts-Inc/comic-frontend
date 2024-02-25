import { JSX } from 'react';

import Image from './Image';
import Locked from './Locked';
import Multiple from './Multiple';
import Text from './Text';
import Vector from './Vector';

export default {
  StaticText: Text,
  StaticVector: Vector,
  StaticImage: Image,
  Locked,
  Multiple,
} as { [key: string]: () => JSX.Element };
