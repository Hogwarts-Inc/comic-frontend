// TODO remove commented items if not needed, when the text component is ready

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';

import { useEditor } from '@layerhub-io/react';
import { ILayer, LayerType } from '@layerhub-io/types';
import { Block } from 'baseui/block';
import { Button, SIZE } from 'baseui/button';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import { useStyletron } from 'styletron-react';

import { Resource } from 'src/store/slices/resources/reducer';

import { CloseSideBar } from './Common/CloseSideBar';
import { ImageItem } from './Images';
import Scrollable from '../../../../../components/Scrollable';
import { FontItem } from '../../../../../interfaces/common';
// import { IComponent } from '../../../../../interfaces/DesignEditor';
// import api from '../../../../../services/api';
// import { selectPublicComponents } from '../../../../../store/slices/components/selectors';
import { loadFonts } from '../../../../../utils/fonts';

// function TextComponentItem({
//   component,
//   onClick,
//   onDragStart,
// }: {
//   component: IComponent;
//   onDragStart: (ev: React.DragEvent<HTMLDivElement>) => void;
//   onClick: (option: any) => void;
// }) {
//   const [css] = useStyletron();
//   return (
//     <div
//       onClick={() => onClick(component.id)}
//       onDragStart={onDragStart}
//       className={css({
//         position: 'relative',
//         height: '84px',
//         background: '#f8f8fb',
//         cursor: 'pointer',
//         padding: '12px',
//         borderRadius: '8px',
//         overflow: 'hidden',
//         '::before:hover': {
//           opacity: 1,
//         },
//         userSelect: 'all',
//       })}>
//       <img
//         src={component.preview.src}
//         className={css({
//           width: '100%',
//           height: '100%',
//           objectFit: 'contain',
//           pointerEvents: 'none',
//           verticalAlign: 'middle',
//         })}
//       />
//     </div>
//   );
// }

export default function Text({ images }: { images: Resource[] }) {
  const editor = useEditor();
  // const components = useSelector(selectPublicComponents);
  const { t } = useTranslation();

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

  // const makeAddComponent = async (id: string) => {
  //   if (editor) {
  //     const component = await api.getComponentById(id);
  //     const fontItemsList: FontItem[] = [];
  //     const object: any = component.layers[0];
  //     if (object.type === 'Group') {
  //       object.objects.forEach((object: any) => {
  //         if (object.type === 'StaticText' || object.type === 'DynamicText') {
  //           fontItemsList.push({
  //             name: object.fontFamily,
  //             url: object.fontURL,
  //           });
  //         }
  //       });
  //       const filteredFonts = fontItemsList.filter(f => !!f.url);
  //       await loadFonts(filteredFonts);
  //     } else {
  //       if (object.type === 'StaticText') {
  //         fontItemsList.push({
  //           name: object.fontFamily,
  //           url: object.fontURL,
  //         });
  //         await loadFonts(fontItemsList);
  //       }
  //     }

  //     editor.objects.add(object);
  //   }
  // };

  // const onDragStart = React.useCallback(async (ev: React.DragEvent<HTMLDivElement>, item: any) => {
  //   const img = new Image();
  //   img.src = item.preview;
  //   ev.dataTransfer.setDragImage(img, img.width / 2, img.height / 2);
  //   // editor.dragger.onDragStart(item)
  // }, []);

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
          <div style={{ display: 'grid', gap: '8px', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
            {images.map(image => (
              <ImageItem key={image.id} onClick={() => addImage(image.url)} preview={image.url} />
            ))}
          </div>

          <Block
            $style={{
              paddingTop: '0.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
            }}>
            {/* TODO remove if not needed */}
            {/* {components?.map(component => (
              <TextComponentItem
                onDragStart={(ev: React.DragEvent<HTMLDivElement>) => onDragStart(ev, component)}
                onClick={makeAddComponent}
                key={component.id}
                component={component}
              />
            ))} */}
          </Block>
        </Block>
      </Scrollable>
    </Block>
  );
}
