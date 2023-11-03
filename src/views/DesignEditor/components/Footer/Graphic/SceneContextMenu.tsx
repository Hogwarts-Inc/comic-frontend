/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

import { useEditor, useFrame } from '@layerhub-io/react';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

import { ScenesWithPosition } from 'src/contexts/DesignEditor';

import { SceneButton, SceneButtonContainer } from './styles';
import { getDefaultTemplate } from '../../../../../constants/design-editor';
import useDesignEditorContext from '../../../../../hooks/useDesignEditorContext';
import useOnClickOutside from '../../../../../hooks/useOnClickOutside';

function SceneContextMenu() {
  const {
    scenes,
    setScenes,
    setContextMenuTimelineRequest,
    contextMenuTimelineRequest,
    setCurrentScene,
    setCurrentDesign,
  } = useDesignEditorContext();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const editor = useEditor();
  const frame = useFrame();
  const { t } = useTranslation();
  useOnClickOutside(ref, () => {
    setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false });
  });

  const timelineItemsContainerBounds = document.getElementById('TimelineItemsContainer')?.getBoundingClientRect() || {
    top: 0,
    left: 0,
  };

  const makeDeleteScene = async () => {
    const updatedScenes = scenes.filter(
      ({ history, scenePosition }) => history[scenePosition].id !== contextMenuTimelineRequest.id,
    );

    setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false });
    if (updatedScenes.length) {
      setScenes(updatedScenes);
    } else {
      const defaultTemplate = getDefaultTemplate({
        width: frame.width,
        height: frame.height,
      });

      await editor.scene.importFromJSON(defaultTemplate);
      setCurrentDesign({
        id: nanoid(),
        frame: defaultTemplate.frame,
        metadata: {},
        name: 'Untitled Design',
        previews: [],
        scenes: [],
        type: 'VIDEO',
        published: false,
      });
      const initialDesign = editor.scene.exportToJSON();
      const preview = (await editor.renderer.render(initialDesign)) as string;
      setCurrentScene({ ...initialDesign, preview: preview, duration: 5000 });
      setScenes([{ history: [{ ...initialDesign, preview: preview, duration: 5000 }], scenePosition: 0 }]);
    }
  };

  const makeDuplicateScene = () => {
    const currentScene = scenes.find(
      ({ history, scenePosition }) => history[scenePosition].id === contextMenuTimelineRequest.id,
    );
    if (currentScene) {
      const id = nanoid();
      const newHistory = currentScene.history.map(scene => ({ ...scene, id }));
      const updatedScenes: ScenesWithPosition = [
        ...scenes,
        { history: newHistory, scenePosition: newHistory.length - 1 },
      ];
      setScenes(updatedScenes);
    }

    setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false });
  };

  return (
    <SceneButtonContainer
      ref={ref}
      left={`${contextMenuTimelineRequest.left - timelineItemsContainerBounds.left}px`}
      top={`${contextMenuTimelineRequest.top - timelineItemsContainerBounds.top - 80}px`}>
      {scenes.length < 3 && <SceneButton onClick={makeDuplicateScene}>{t('scene.duplicate')}</SceneButton>}
      <SceneButton onClick={makeDeleteScene}>{t('scene.delete')}</SceneButton>
    </SceneButtonContainer>
  );
}

export default SceneContextMenu;
