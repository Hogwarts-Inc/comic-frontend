/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';

import { useActiveObject, useEditor } from '@layerhub-io/react';
import { Block } from 'baseui/block';
import { PLACEMENT, StatefulPopover } from 'baseui/popover';
import { debounce } from 'lodash';
import { HexColorPicker } from 'react-colorful';

import Common from './Common';
import Flip from './Shared/Flip';

function Vector() {
  const [state, setState] = React.useState<{ colorMap: { [key: string]: string } }>({
    colorMap: {},
  });
  const activeObject = useActiveObject() as any;
  const editor = useEditor();

  React.useEffect(() => {
    if (activeObject && activeObject.type === 'StaticVector') {
      setState({ colorMap: activeObject.colorMap });
    }
  }, [activeObject]);

  const forceUpdate = useCallback(
    debounce(async () => {
      await editor.scene.importFromJSON(editor.scene.exportToJSON());
      editor.objects.select(activeObject.id);
    }, 1000),
    [editor, activeObject],
  );

  const changeBackgroundColor = (prev: string, next: string) => {
    activeObject.updateLayerColor(prev, next);
    forceUpdate();
    setState({
      colorMap: {
        ...state.colorMap,
        [prev]: next,
      },
    });
  };

  return (
    <Block
      $style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        justifyContent: 'space-between',
      }}>
      <Block>
        <Block $style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Block $style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {Object.keys(state.colorMap).map(c => (
              <StatefulPopover
                dismissOnClickOutside
                key={c}
                placement={PLACEMENT.bottomLeft}
                content={
                  <div
                    style={{
                      padding: '1rem',
                      background: '#ffffff',
                      width: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      textAlign: 'center',
                    }}>
                    <HexColorPicker
                      onChange={color => {
                        changeBackgroundColor(c, color);
                      }}
                    />
                  </div>
                }
                accessibilityType="tooltip">
                <div>
                  <div
                    style={{
                      height: '24px',
                      width: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backgroundColor: state.colorMap[c],
                      border: '1px solid #dedede',
                    }}
                  />
                </div>
              </StatefulPopover>
            ))}
          </Block>
          <Flip />
        </Block>
      </Block>
      <Common />
    </Block>
  );
}

export default Vector;
