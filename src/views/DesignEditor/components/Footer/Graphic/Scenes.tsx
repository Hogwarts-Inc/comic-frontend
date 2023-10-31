/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { DndContext, closestCenter, PointerSensor, useSensor, DragOverlay } from '@dnd-kit/core';
import { restrictToFirstScrollableAncestor, restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useEditor, useFrame } from '@layerhub-io/react';
import { IScene } from '@layerhub-io/types';
import { Grid } from '@mui/material';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { nanoid } from 'nanoid';

import AngleDoubleLeft from '@components/Icons/AngleDoubleLeft';
import useIsMobile from 'src/hooks/useIsMobile';

import SceneContextMenu from './SceneContextMenu';
import SceneItem from './SceneItem';
import Add from '../../../../../components/Icons/Add';
import { getDefaultTemplate } from '../../../../../constants/design-editor';
import { DesignEditorContext, ScenesWithPosition } from '../../../../../contexts/DesignEditor';
import useContextMenuTimelineRequest from '../../../../../hooks/useContextMenuTimelineRequest';
import useDesignEditorPages from '../../../../../hooks/useDesignEditorScenes';

function Scenes() {
  const scenes = useDesignEditorPages();
  const { setScenes, setCurrentScene, currentScene, setCurrentDesign, currentDesign } = useContext(DesignEditorContext);
  const isMobile = useIsMobile();
  const editor = useEditor();
  const [css] = useStyletron();
  const frame = useFrame();
  const [draggedScene, setDraggedScene] = useState<IScene | null>(null);
  const contextMenuTimelineRequest = useContextMenuTimelineRequest();
  const [isOpen, setIsOpen] = useState(true);

  const sensors = [
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  ];

  useEffect(() => {
    if (editor && scenes && currentScene) {
      const currentSceneLoaded = scenes.find(
        ({ history, scenePosition }) => history[scenePosition].id === currentScene?.id,
      );
      if (!currentSceneLoaded) {
        setCurrentScene(scenes[0].history[scenes[0].scenePosition]);
      }
    }
  }, [editor, scenes, currentScene, setCurrentScene]);
  const watcher = useCallback(async () => {
    const updatedTemplate = editor.scene.exportToJSON();

    const updatedPages = await Promise.all(
      scenes.map(async p => {
        if (p.history[p.scenePosition].id === updatedTemplate.id) {
          const needToPushNewHistory =
            JSON.stringify(p.history[p.scenePosition].layers) !== JSON.stringify(updatedTemplate.layers);
          if (needToPushNewHistory) {
            const position = p.scenePosition + 1;
            const updatedPreview = (await editor.renderer.render(updatedTemplate)) as string;
            const newHistory = p.history.slice(0, needToPushNewHistory ? position : p.history.length);
            newHistory[position] = { ...updatedTemplate, preview: updatedPreview };
            return { scenePosition: position, history: newHistory };
          }
        }
        return p;
      }),
    );
    setScenes(updatedPages);
  }, [editor, scenes, setScenes]);

  useEffect(() => {
    if (editor) {
      editor.on('history:changed', watcher);
    }
    return () => {
      if (editor) {
        editor.off('history:changed', watcher);
      }
    };
  }, [editor, watcher]);

  const updateCurrentScene = React.useCallback(
    async (design: IScene) => {
      await editor.scene.importFromJSON(design);
    },
    [editor],
  );

  useEffect(() => {
    if (editor) {
      if (currentScene) {
        updateCurrentScene(currentScene);
      } else {
        const defaultTemplate = getDefaultTemplate({
          width: 1200,
          height: 1200,
        });
        setCurrentDesign({
          id: nanoid(),
          frame: defaultTemplate.frame,
          metadata: {},
          name: 'Untitled Design',
          previews: [],
          scenes: [],
          type: 'PRESENTATION',
          published: false,
        });
        editor.scene
          .importFromJSON(defaultTemplate)
          .then(() => {
            const initialDesign = editor.scene.exportToJSON();
            editor.renderer.render(initialDesign).then(data => {
              setCurrentScene({ ...initialDesign, preview: data as string });
              setScenes([{ history: [{ ...initialDesign, preview: data as string }], scenePosition: 0 }]);
            });
          })
          .catch(console.log);
      }
    }
  }, [editor, currentScene, setCurrentDesign, setCurrentScene, setScenes, updateCurrentScene]);

  const addScene = useCallback(async () => {
    const defaultTemplate = getDefaultTemplate(currentDesign.frame);
    const newPreview = (await editor.renderer.render(defaultTemplate)) as string;
    const newPage = { ...defaultTemplate, id: nanoid(), preview: newPreview };
    const newPages: ScenesWithPosition = [...scenes, { history: [newPage], scenePosition: 0 }];
    setScenes(newPages);
    setCurrentScene(newPage);
  }, [editor, scenes, currentDesign, setScenes, setCurrentScene]);

  const handleDragStart = (event: any) => {
    const newDraggedScene = scenes.find(({ history, scenePosition }) => history[scenePosition].id === event.active.id);
    if (newDraggedScene) {
      setDraggedScene(newDraggedScene.history[newDraggedScene.scenePosition]);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setScenes(items => {
        const oldIndex = items.findIndex(({ history, scenePosition }) => history[scenePosition].id === active.id);
        const newIndex = items.findIndex(({ history, scenePosition }) => history[scenePosition].id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setDraggedScene(null);
  };

  return (
    <Grid container justifyContent="flex-end">
      {isMobile && (
        <Block
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          $style={{ padding: '0.5rem', cursor: 'pointer', display: 'flex', rotate: isOpen ? '270deg' : '90deg' }}>
          <AngleDoubleLeft size={18} />
        </Block>
      )}
      {(isOpen || !isMobile) && (
        <Grid container wrap="nowrap" overflow="hidden">
          <DndContext
            modifiers={[restrictToFirstScrollableAncestor, restrictToHorizontalAxis]}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}>
            <Block
              id="TimelineItemsContainer"
              $style={{ padding: '0.25rem 0.75rem', background: '#ffffff', position: 'relative' }}>
              <div className={css({ display: 'flex', alignItems: 'center' })}>
                {contextMenuTimelineRequest.visible && <SceneContextMenu />}

                <SortableContext
                  items={scenes.map(({ history, scenePosition }) => history[scenePosition])}
                  strategy={horizontalListSortingStrategy}>
                  {scenes.map(({ history, scenePosition }, index) => (
                    <SceneItem
                      key={history[scenePosition].id}
                      isCurrentScene={history[scenePosition].id === currentScene?.id}
                      scene={history[scenePosition]}
                      index={index}
                      changePage={setCurrentScene}
                      preview={history[scenePosition]?.preview || ''}
                    />
                  ))}
                  {scenes.length < 3 && (
                    <div
                      style={{
                        background: '#ffffff',
                        padding: '1rem 1rem 1rem 0.5rem',
                      }}>
                      <div
                        onClick={addScene}
                        className={css({
                          width: '100px',
                          height: '56px',
                          background: 'rgb(243,244,246)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        })}>
                        <Add size={20} />
                      </div>
                    </div>
                  )}
                </SortableContext>
                <DragOverlay>
                  {draggedScene ? (
                    <Block
                      $style={{
                        backgroundImage: `url(${draggedScene.preview})`,
                        backgroundSize: `${frame ? (frame.width * 70) / frame.height : 70}px 70px`,
                        height: '80px',
                        opacity: 0.75,
                      }}
                    />
                  ) : null}
                </DragOverlay>
              </div>
            </Block>
          </DndContext>
        </Grid>
      )}
    </Grid>
  );
}

export default Scenes;
