/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

import { useEditor } from '@layerhub-io/react';
import { Block } from 'baseui/block';
import { Delete } from 'baseui/icon';

import Scrollable from '../../../../../components/Scrollable';
import { TEXT_EFFECTS } from '../../../../../constants/design-editor';

const EFFECTS = {
  None: {
    fill: '#333333',
    strokeWidth: 0,
    shadow: {
      blur: 2,
      color: '#afafaf',
      offsetX: 10,
      offsetY: 10,
      enabled: false,
    },
  },
  Shadow: {
    fill: '#333333',
    shadow: {
      blur: 2,
      color: '#afafaf',
      offsetX: 10,
      offsetY: 10,
      enabled: true,
    },
  },
  Lift: {
    fill: '#333333',
    shadow: {
      blur: 25,
      color: 'rgba(0,0,0,0.45)',
      offsetX: 0,
      offsetY: 0,
      enabled: true,
    },
  },
  Hollow: {
    stroke: '#000000',
    fill: null,
    strokeWidth: 2,
    shadow: {
      blur: 25,
      color: 'rgba(0,0,0,0.45)',
      offsetX: 0,
      offsetY: 0,
      enabled: false,
    },
  },
  Splice: {
    stroke: '#000000',
    fill: null,
    strokeWidth: 2,
    shadow: {
      blur: 0,
      color: '#afafaf',
      offsetX: 10,
      offsetY: 10,
      enabled: true,
    },
  },
  Neon: {
    stroke: '#e84393',
    fill: '#fd79a8',
    strokeWidth: 2,
    shadow: {
      blur: 25,
      color: '#fd79a8',
      offsetX: 0,
      offsetY: 0,
      enabled: true,
    },
  },
};
const TextEffects = () => {
  const editor = useEditor();

  const applyEffect = (name: string) => {
    if (editor) {
      //  @ts-ignore
      const effect = EFFECTS[name];
      if (effect) {
        editor.objects.update(effect);
      }
    }
  };
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
        <Block>Effects</Block>

        <Block $style={{ cursor: 'pointer', display: 'flex' }}>
          <Delete size={24} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          <Block $style={{ display: 'grid', gridTemplateColumns: '80px 80px 80px', gap: '0.5rem' }}>
            {TEXT_EFFECTS.map((effect, index) => (
              <Block style={{ cursor: 'pointer' }} key={index}>
                <Block
                  onClick={() => applyEffect(effect.name)}
                  $style={{
                    border: '1px solid #afafaf',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80px',
                  }}>
                  <img style={{ width: '70px' }} src={effect.preview} />
                </Block>
                <Block
                  $style={{
                    textAlign: 'center',
                    padding: '0.5rem',
                    fontSize: '14px',
                  }}>
                  {effect.name}
                </Block>
              </Block>
            ))}
          </Block>
          {/* <Block>
            <Outline />
            <Shadow />
          </Block> */}
        </Block>
      </Scrollable>
    </Block>
  );
};

export default TextEffects;
