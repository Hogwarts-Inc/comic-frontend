import Canvas from './Canvas';
import Image from './Image';
import Locked from './Locked';
import Multiple from './Multiple';
import Path from './Path';
import Text from './Text';
import Vector from './Vector';

export default {
  StaticText: Text,
  StaticPath: Path,
  StaticImage: Image,
  StaticVector: Vector,
  Locked,
  Multiple,
  Canvas,
} as { [key: string]: () => React.JSX.Element };
