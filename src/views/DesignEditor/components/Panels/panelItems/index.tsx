/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

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

function ImagesConvertor() {
  const { t } = useTranslation();
  const { background } = useSelector((state: RootState) => state.resources);
  return <Images title={t('panels.panelsList.images')} images={background} />;
}

function CharacterConvertor() {
  const { t } = useTranslation();
  const { characters } = useSelector((state: RootState) => state.resources);
  return <Images title={t('panels.panelsList.characters')} images={characters} />;
}

function ShapesConvertor() {
  const { t } = useTranslation();
  const { shapes } = useSelector((state: RootState) => state.resources);
  return <Images title={t('panels.panelsList.shapes')} images={shapes} />;
}

function TextConvertor() {
  const { dialog } = useSelector((state: RootState) => state.resources);
  return <Text images={dialog} />;
}

export default {
  StaticText: TextProperties,
  Text: TextConvertor,
  Customize: Customize,
  FontSelector: FontSelector,
  Pixabay: Pixabay,
  Templates: Templates,
  Uploads: Uploads,
  Images: ImagesConvertor,
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
