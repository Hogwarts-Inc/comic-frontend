/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useMemo } from 'react';

import { useEditor, useZoomRatio } from '@layerhub-io/react';
import { styled } from 'baseui';
import { Block } from 'baseui/block';
import { Button, KIND, SIZE } from 'baseui/button';
import { Input } from 'baseui/input';
import { Slider } from 'baseui/slider';
import { PLACEMENT } from 'baseui/toast';
import { StatefulTooltip } from 'baseui/tooltip';

import { DesignEditorContext } from 'src/contexts/DesignEditor';

import { ButtonContainer } from './styles';
import Icons from '../../../../../components/Icons';

const Container = styled('div', ({ $theme }: { $theme: { colors: { white: string } } }) => ({
  height: '50px',
  background: $theme.colors.white,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

interface Options {
  zoomRatio: number;
}

function Common() {
  const zoomMin = 10;
  const zoomMax = 240;
  const [options, setOptions] = React.useState<Options>({
    zoomRatio: 20,
  });
  const editor = useEditor();
  const zoomRatio: number = useZoomRatio();
  const { setScenes, setCurrentScene, currentScene, scenes } = useContext(DesignEditorContext);

  useEffect(() => {
    setOptions(currentOptions => ({ ...currentOptions, zoomRatio: Math.round(zoomRatio * 100) }));
  }, [zoomRatio]);

  const applyZoomRatio = (type: string, e: any) => {
    const { value } = e.target;
    if (editor) {
      if (value === '') {
        setOptions({ ...options, zoomRatio: options.zoomRatio });
      } else {
        const parsedValue = parseFloat(value);

        if (parsedValue < 0) {
          editor.zoom.zoomToRatio(zoomMin / 100);
        } else if (parsedValue > zoomMax) {
          editor.zoom.zoomToRatio(zoomMax / 100);
        } else {
          editor.zoom.zoomToRatio(parsedValue / 100);
        }
      }
    }
  };

  const { isUndoEnable, isRedoEnable } = useMemo(() => {
    const sceneFound = scenes.find(scene => scene.history[scene.scenePosition].id === currentScene?.id) || {
      history: [currentScene],
      scenePosition: 0,
    };

    return {
      isRedoEnable: sceneFound?.history.length > sceneFound.scenePosition + 1,
      isUndoEnable: sceneFound.history[sceneFound.scenePosition - 1]?.name && sceneFound?.scenePosition > 0,
    };
  }, [currentScene, scenes]);

  const moveHistory = (newPosition: 1 | -1) => {
    if (editor) {
      let newCurrentScene = currentScene;
      const newScene = scenes.map(scene => {
        if (currentScene?.id === scene.history[scene.scenePosition].id) {
          newCurrentScene = scene.history[scene.scenePosition + newPosition];
          return { ...scene, scenePosition: scene.scenePosition + newPosition };
        }
        return scene;
      });
      setScenes(newScene);
      setCurrentScene(newCurrentScene);
    }
  };

  const handleRedo = () => {
    moveHistory(1);
  };

  const handleUndo = () => {
    moveHistory(-1);
  };

  return (
    <Container>
      <ButtonContainer>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Layers size={20} />
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button kind={KIND.tertiary} size={SIZE.compact} onClick={() => editor.zoom.zoomToFit()}>
          <Icons.Compress size={16} />
        </Button>
        <Block>
          <StatefulTooltip placement={PLACEMENT.bottom} showArrow accessibilityType="tooltip" content="Zoom Out">
            <Button kind={KIND.tertiary} size={SIZE.compact} onClick={() => editor.zoom.zoomOut()}>
              <Icons.RemoveCircleOutline size={24} />
            </Button>
          </StatefulTooltip>
        </Block>
        <Slider
          overrides={{
            InnerThumb: () => null,
            ThumbValue: () => null,
            TickBar: () => null,
            Root: {
              style: { width: '140px' },
            },
            Thumb: {
              style: {
                height: '12px',
                width: '12px',
                paddingLeft: 0,
              },
            },
            Track: {
              style: {
                paddingLeft: 0,
                paddingRight: 0,
              },
            },
          }}
          value={[options.zoomRatio]}
          onChange={({ value }) => applyZoomRatio('zoomRatio', { target: { value: value[0] } })}
          min={zoomMin}
          max={zoomMax}
        />
        <Block>
          <StatefulTooltip placement={PLACEMENT.bottom} showArrow accessibilityType="tooltip" content="Zoom Out">
            <Button kind={KIND.tertiary} size={SIZE.compact} onClick={() => editor.zoom.zoomIn()}>
              <Icons.AddCircleOutline size={24} />
            </Button>
          </StatefulTooltip>
        </Block>
        <Input
          type="number"
          endEnhancer="%"
          overrides={{
            Input: {
              style: {
                backgroundColor: '#ffffff',
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
              },
            },
            Root: {
              style: {
                borderBottomColor: 'rgba(0,0,0,0.15)',
                borderTopColor: 'rgba(0,0,0,0.15)',
                borderRightColor: 'rgba(0,0,0,0.15)',
                borderLeftColor: 'rgba(0,0,0,0.15)',
                borderTopWidth: '1px',
                borderBottomWidth: '1px',
                borderRightWidth: '1px',
                borderLeftWidth: '1px',
                height: '20px',
                width: '52px',
                paddingRight: 0,
              },
            },
            EndEnhancer: {
              style: {
                paddingLeft: 0,
                paddingRight: '10px',
                backgroundColor: '#ffffff',
              },
            },
          }}
          size={SIZE.mini}
          max={zoomMax}
          min={zoomMin}
          onChange={e => applyZoomRatio('zoomRatio', e)}
          value={options.zoomRatio}
        />
      </ButtonContainer>
      <ButtonContainer>
        <Button kind={KIND.tertiary} size={SIZE.compact} onClick={handleUndo} disabled={!isUndoEnable}>
          <Icons.Undo size={22} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact} onClick={handleRedo} disabled={!isRedoEnable}>
          <Icons.Redo size={22} />
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default Common;
