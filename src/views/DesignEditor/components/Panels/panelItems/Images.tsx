/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';

import { useEditor } from '@layerhub-io/react';
import { ILayer, LayerType } from '@layerhub-io/types';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';

import { Resource } from 'src/store/slices/resources/reducer';

import { CloseSideBar } from './Common/CloseSideBar';
import Scrollable from '../../../../../components/Scrollable';

export const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
  const [css] = useStyletron();
  return (
    <div
      onClick={onClick}
      className={css({
        position: 'relative',
        background: '#f8f8fb',
        cursor: 'pointer',
        borderRadius: '8px',
        overflow: 'hidden',
        '::before:hover': {
          opacity: 1,
        },
      })}>
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
          height: '100%',
          width: '100%',
          ':hover': {
            opacity: 1,
          },
        })}
      />
      <img
        src={preview}
        className={css({
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
          verticalAlign: 'middle',
        })}
      />
    </div>
  );
};
const Images = ({ title, images }: { title: string; images: Resource[] }) => {
  const editor = useEditor();

  const addObject = useCallback(
    (url: string) => {
      if (editor) {
        const options: Partial<ILayer> = {
          type: LayerType.STATIC_IMAGE,
          src: url,
        };
        editor.objects.add(options);
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
        <Block>{title}</Block>
        <CloseSideBar />
      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          <div style={{ display: 'grid', gap: '8px', gridTemplateColumns: '1fr 1fr' }}>
            {images.map(image => (
              <ImageItem key={image.id} onClick={() => addObject(image.url)} preview={image.url} />
            ))}
          </div>
        </Block>
      </Scrollable>
    </Block>
  );
};

export default Images;
