import CanvasFill from './CanvasFill';
import Customize from './Customize';
import Elements from './Elements';
import FontSelector from './FontSelector';
import Graphics from './Graphics';
import Images from './Images';
import Layers from './Layers';
import PathFill from './PathFill';
import Pixabay from './Pixabay';
import Templates from './Templates';
import Text from './Text';
import TextEffects from './TextEffects';
import TextFill from './TextFill';
import TextProperties from './TextProperties';
import Uploads from './Uploads';
import Videos from './Videos';

export default {
  StaticText: TextProperties,
  Text: Text,
  Customize: Customize,
  FontSelector: FontSelector,
  Pixabay: Pixabay,
  Templates: Templates,
  Uploads: Uploads,
  Images: Images,
  Videos: Videos,
  Elements: Elements,
  Graphics: Graphics,
  Layers: Layers,
  TextFill: TextFill,
  PathFill: PathFill,
  CanvasFill: CanvasFill,
  TextEffects: TextEffects,
} as { [key: string]: () => React.JSX.Element };
