/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useEditor, useObjects } from '@layerhub-io/react';
import { ILayer } from '@layerhub-io/types';
import { Block } from 'baseui/block';
import { Button, KIND, SIZE } from 'baseui/button';

import { CloseSideBar } from './Common/CloseSideBar';
import Delete from '../../../../../components/Icons/Delete';
import Eye from '../../../../../components/Icons/Eye';
import EyeCrossed from '../../../../../components/Icons/EyeCrossed';
import Locked from '../../../../../components/Icons/Locked';
import Unlocked from '../../../../../components/Icons/Unlocked';
import Scrollable from '../../../../../components/Scrollable';

function Layers() {
  const editor = useEditor();
  const objects = useObjects() as ILayer[];
  const [layerObjects, setLayerObjects] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (objects) {
      setLayerObjects(objects);
    }
  }, [objects]);

  React.useEffect(() => {
    const watcher = async () => {
      if (objects) {
        setLayerObjects([...objects]);
      }
    };
    if (editor) {
      editor.on('history:changed', watcher);
    }
    return () => {
      if (editor) {
        editor.off('history:changed', watcher);
      }
    };
  }, [editor, objects]);

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
        <Block>Layers</Block>

        <CloseSideBar />
      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          {layerObjects.map(object => (
            <Block
              $style={{
                display: 'grid',
                gridTemplateColumns: '1fr 90px',
                fontSize: '14px',
                alignItems: 'center',
                ':hover': {
                  background: 'rgb(245,246,247)',
                },
              }}
              key={object.id}>
              <Block $style={{ cursor: 'pointer' }} onClick={() => editor.objects.select(object.id)}>
                {object.name}
              </Block>
              <Block $style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {object.locked ? (
                  <Button
                    kind={KIND.tertiary}
                    size={SIZE.mini}
                    onClick={() => editor.objects.unlock(object.id)}
                    overrides={{
                      Root: {
                        style: {
                          paddingLeft: '4px',
                          paddingRight: '4px',
                        },
                      },
                    }}>
                    <Locked size={24} />
                  </Button>
                ) : (
                  <Button
                    kind={KIND.tertiary}
                    size={SIZE.mini}
                    onClick={() => editor.objects.lock(object.id)}
                    overrides={{
                      Root: {
                        style: {
                          paddingLeft: '4px',
                          paddingRight: '4px',
                        },
                      },
                    }}>
                    <Unlocked size={24} />
                  </Button>
                )}

                {object.visible ? (
                  <Button
                    kind={KIND.tertiary}
                    size={SIZE.mini}
                    onClick={() => editor.objects.update({ visible: false }, object.id)}
                    overrides={{
                      Root: {
                        style: {
                          paddingLeft: '4px',
                          paddingRight: '4px',
                        },
                      },
                    }}>
                    <Eye size={24} />
                  </Button>
                ) : (
                  <Button
                    kind={KIND.tertiary}
                    size={SIZE.mini}
                    onClick={() => editor.objects.update({ visible: true }, object.id)}
                    overrides={{
                      Root: {
                        style: {
                          paddingLeft: '4px',
                          paddingRight: '4px',
                        },
                      },
                    }}>
                    <EyeCrossed size={24} />
                  </Button>
                )}
                <Button
                  kind={KIND.tertiary}
                  size={SIZE.mini}
                  onClick={() => editor.objects.remove(object.id)}
                  overrides={{
                    Root: {
                      style: {
                        paddingLeft: '4px',
                        paddingRight: '4px',
                      },
                    },
                  }}>
                  <Delete size={24} />
                </Button>
              </Block>
            </Block>
          ))}
        </Block>
      </Scrollable>
    </Block>
  );
}

export default Layers;
