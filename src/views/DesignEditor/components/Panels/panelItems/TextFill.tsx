import React from 'react';

import { useActiveObject, useEditor } from '@layerhub-io/react';
import { Block } from 'baseui/block';
import { Delete } from 'baseui/icon';
import { throttle } from 'lodash';
import { HexColorPicker } from 'react-colorful';
import { useTranslation } from 'react-i18next';

import useAppContext from 'src/hooks/useAppContext';
import useIsMobile from 'src/hooks/useIsMobile';

import Scrollable from '../../../../../components/Scrollable';

const PRESET_COLORS = [
  '#f44336',
  '#ff9800',
  '#ffee58',
  '#66bb6a',
  '#26a69a',
  '#03a9f4',
  '#3f51b5',
  '#673ab7',
  '#9c27b0',
  '#ec407a',
  '#8d6e63',
  '#d9d9d9',
];

function TextFill() {
  const activeObject = useActiveObject();
  const editor = useEditor();
  const { t } = useTranslation();
  const { setActiveSubMenu } = useAppContext();
  const isMobile = useIsMobile();

  const updateObjectFill = throttle((color: string) => {
    if (activeObject) {
      editor.objects.update({ fill: color });
    }
  }, 100);

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
        <Block>{t('editor.textFill')}</Block>

        <Block onClick={() => setActiveSubMenu('')} $style={{ cursor: 'pointer', display: 'flex' }}>
          <Delete size={24} />
        </Block>
      </Block>
      <Scrollable>
        <Block
          style={{
            padding: '0 1.5rem',
            display: isMobile ? 'flex' : 'block',
            flexDirection: isMobile ? 'row' : 'column',
            gap: isMobile ? '1rem' : '0',
          }}>
          <HexColorPicker onChange={updateObjectFill} style={{ width: isMobile ? '50%' : '100%' }} />
          <Block>
            <Block $style={{ padding: '0.75rem 0', fontWeight: 500, fontSize: '14px' }}>
              {t('editor.defaultColors')}
            </Block>
            <Block $style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', gap: '0.25rem' }}>
              {PRESET_COLORS.map(color => (
                <Block
                  $style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => updateObjectFill(color)}
                  backgroundColor={color}
                  height="38px"
                  key={color}
                />
              ))}
            </Block>
          </Block>
        </Block>
      </Scrollable>
    </Block>
  );
}

export default TextFill;
