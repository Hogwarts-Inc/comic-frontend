import React from 'react';

import { useTranslation } from 'react-i18next';

import { ContextType } from 'src/interfaces/common';

import { Title } from './styles';

export const TitleView = ({ context }: { context: ContextType }) => {
  const { t } = useTranslation();
  const title = context === 'chapter' ? t('chapterCreate.title') : t('addCanva.title');
  return <Title variant="h3">{title}</Title>;
};
