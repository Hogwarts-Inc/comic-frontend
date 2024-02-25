/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useEditor } from '@layerhub-io/react';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';

import useIsMobile from 'src/hooks/useIsMobile';
import { Resource } from 'src/store/slices/resources/reducer';
import { toBase64 } from 'src/utils/data';

import { CloseSideBar } from './Common/CloseSideBar';
import { ImageContainer } from './styles';
import Scrollable from '../../../../../components/Scrollable';

export const GraphicItem = ({ preview, onClick }: { preview: string; onClick: (option: any) => void }) => {
  const [css] = useStyletron();
  return (
    <div
      onClick={onClick}
      className={css({
        position: 'relative',
        height: '84px',
        background: '#f8f8fb',
        cursor: 'pointer',
        padding: '12px',
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
      <div
        className={css({
          backgroundImage: `url(${preview.replace('data:application/octet-stream', 'data:image/svg+xml')})`,
          height: '100%',
          width: 'auto',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundOrigin: 'border-box',
        })}
      />
    </div>
  );
};

const Graphics = ({ title, images }: { title: string; images: Resource[] }) => {
  const editor = useEditor();
  const [vectors, setVectors] = useState<string[]>([]);
  const isMobile = useIsMobile();
  useEffect(() => {
    Promise.all(
      images.map(async image => {
        const data = await fetch(image.url);

        const blob = await data.blob();

        return toBase64(blob);
      }),
    ).then(setVectors);
  }, [images]);

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: 'StaticVector',
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
        <Block padding="0 1.5rem 1.5rem 1.5rem">
          <ImageContainer isMobile={!!isMobile}>
            {vectors.map((vector, index) => (
              <GraphicItem onClick={() => addObject(vector)} key={index} preview={vector} />
            ))}
          </ImageContainer>
        </Block>
      </Scrollable>
    </Block>
  );
};

export default Graphics;
