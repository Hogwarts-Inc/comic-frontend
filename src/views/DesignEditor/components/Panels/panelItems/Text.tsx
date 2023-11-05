// TODO remove commented items if not needed, when the text component is ready

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';

import { useEditor } from '@layerhub-io/react';
import { ILayer, LayerType } from '@layerhub-io/types';
import { Block } from 'baseui/block';
import { Button, SIZE } from 'baseui/button';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

import useIsMobile from 'src/hooks/useIsMobile';
import { Resource } from 'src/store/slices/resources/reducer';

import { CloseSideBar } from './Common/CloseSideBar';
import { ImageItem } from './Images';
import { ImageContainer } from './styles';
import Scrollable from '../../../../../components/Scrollable';
import { FontItem } from '../../../../../interfaces/common';
import { loadFonts } from '../../../../../utils/fonts';

export default function Text({ images }: { images: Resource[] }) {
  const editor = useEditor();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const addObject = useCallback(async () => {
    if (editor) {
      const font: FontItem = {
        name: 'OpenSans-Regular',
        url: 'https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf',
      };
      await loadFonts([font]);
      const options: Partial<ILayer> = {
        id: nanoid(),
        type: LayerType.STATIC_TEXT,
        width: 420,
        text: 'Texto',
        fontSize: 40,
        fontFamily: font.name,
        textAlign: 'center',
        fontURL: font.url,
        fill: '#333333',
        metadata: {},
      };
      await editor.objects.add(options);
    }
  }, [editor]);

  const addImage = useCallback(
    async (url: string) => {
      if (editor) {
        const options: Partial<ILayer> = {
          type: LayerType.STATIC_IMAGE,
          src: url,
        };
        await editor.objects.add(options);
      }
    },
    [editor],
  );

  return (
    <Block $style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Block
        $style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          justifyContent: 'space-between',
          padding: '1.5rem',
        }}>
        <Block>{t('text.title')}</Block>
        <CloseSideBar />
      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          <Button
            onClick={addObject}
            size={SIZE.compact}
            overrides={{
              Root: {
                style: {
                  width: '100%',
                },
              },
            }}>
            {t('text.add')}
          </Button>
          <ImageContainer isMobile={!!isMobile}>
            {images.map(image => (
              <ImageItem key={image.id} onClick={() => addImage(image.url)} preview={image.url} />
            ))}
          </ImageContainer>
        </Block>
      </Scrollable>
    </Block>
  );
}
