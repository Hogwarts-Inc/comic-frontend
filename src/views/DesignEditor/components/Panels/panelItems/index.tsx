/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RootState } from 'src/store/rootReducer';

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

const ImagesConvertor = () => {
  const { t } = useTranslation();
  const { images } = useSelector((state: RootState) => state.resources);
  return <Images title={t('panels.panelsList.images')} images={images} />;
};

const CharacterConvertor = () => {
  const { t } = useTranslation();
  const { characters } = useSelector((state: RootState) => state.resources);
  return <Images title={t('panels.panelsList.characters')} images={characters} />;
};

const ShapesConvertor = () => {
  const { t } = useTranslation();
  const { shapes } = useSelector((state: RootState) => state.resources);
  return <Images title={t('panels.panelsList.shapes')} images={shapes} />;
};

const TextConvertor = () => {
  const { text } = useSelector((state: RootState) => state.resources);
  return <Text images={text} />;
};

export default {
  StaticText: TextProperties,
  Text: TextConvertor,
  Customize: Customize,
  FontSelector: FontSelector,
  Pixabay: Pixabay,
  Templates: Templates,
  Uploads: Uploads,
  Images: ImagesConvertor,
  Videos: Videos,
  Elements: Elements,
  Graphics: Graphics,
  Layers: Layers,
  TextFill: TextFill,
  PathFill: PathFill,
  CanvasFill: CanvasFill,
  TextEffects: TextEffects,
  Characters: CharacterConvertor,
  Shapes: ShapesConvertor,
} as { [key: string]: () => React.JSX.Element };
