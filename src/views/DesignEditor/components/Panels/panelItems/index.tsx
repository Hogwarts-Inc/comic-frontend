/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RootState } from 'src/store/rootReducer';

import FontSelector from './FontSelector';
import Graphics from './Graphics';
import IA from './IA';
import Images from './Images';
import Text from './Text';
import TextFill from './TextFill';
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
  return <Graphics title={t('panels.panelsList.shapes')} images={shapes} />;
}

function TextConvertor() {
  const { dialog } = useSelector((state: RootState) => state.resources);
  return <Text images={dialog} />;
}
export default {
  Text: TextConvertor,
  Uploads: Uploads,
  Images: ImagesConvertor,
  Characters: CharacterConvertor,
  Shapes: ShapesConvertor,
  FontSelector,
  TextFill,
  ImageGeneration: IA,
} as { [key: string]: () => React.JSX.Element };
