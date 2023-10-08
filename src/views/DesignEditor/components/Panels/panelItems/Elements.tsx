/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useEditor } from '@layerhub-io/react';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { useTranslation } from 'react-i18next';

import { CloseSideBar } from './Common/CloseSideBar';
import Scrollable from '../../../../../components/Scrollable';
import { graphics } from '../../../../../constants/mock-data';

const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
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
        ':hover': {
          opacity: 1,
          background: 'rgb(233,233,233)',
        },
      })}>
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

const Elements = () => {
  const { t } = useTranslation();
  const editor = useEditor();

  const addObject = React.useCallback(
    (item: any) => {
      if (editor) {
        editor.objects.add(item);
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
        <Block>{t('panels.panelsList.elements')}</Block>

        <CloseSideBar />
      </Block>
      <Scrollable>
        <Block>
          <Block $style={{ display: 'grid', gap: '8px', padding: '1.5rem', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
            {graphics.map((graphic, index) => (
              <ImageItem onClick={() => addObject(graphic)} key={index} preview={graphic.preview} />
            ))}
          </Block>
        </Block>
      </Scrollable>
    </Block>
  );
};

export default Elements;
