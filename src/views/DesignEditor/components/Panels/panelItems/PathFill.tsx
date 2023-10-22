import React from 'react';

import { useActiveObject, useEditor } from '@layerhub-io/react';
import { Block } from 'baseui/block';
import { Delete } from 'baseui/icon';
import { throttle } from 'lodash';
import { HexColorPicker } from 'react-colorful';

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

function PathFill() {
  const activeObject = useActiveObject();
  const editor = useEditor();

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
        <Block>Path Fill</Block>

        <Block $style={{ cursor: 'pointer', display: 'flex' }}>
          <Delete size={24} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          <HexColorPicker onChange={updateObjectFill} style={{ width: '100%' }} />
          <Block>
            <Block $style={{ padding: '0.75rem 0', fontWeight: 500, fontSize: '14px' }}>Preset colors</Block>
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

export default PathFill;
