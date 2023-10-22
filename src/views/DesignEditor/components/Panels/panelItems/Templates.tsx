/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';

import { useEditor } from '@layerhub-io/react';
import { IScene } from '@layerhub-io/types';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

import { CloseSideBar } from './Common/CloseSideBar';
import Scrollable from '../../../../../components/Scrollable';
import useDesignEditorContext from '../../../../../hooks/useDesignEditorContext';
import { IDesign } from '../../../../../interfaces/DesignEditor';
import api from '../../../../../services/api';
import { selectPublicDesigns } from '../../../../../store/slices/designs/selectors';
import { loadTemplateFonts } from '../../../../../utils/fonts';

function ImageItem({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) {
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
}

export default function Templates() {
  const editor = useEditor();
  const { setCurrentScene, currentScene, setScenes, setCurrentDesign } = useDesignEditorContext();
  const designs = useSelector(selectPublicDesigns);

  const loadGraphicTemplate = async (payload: IDesign): Promise<{ scenes: IScene[]; design: IDesign }> => {
    const scenes: IScene[] = [];
    const { scenes: scns, ...design } = payload;

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id || nanoid(),
        layers: scn.layers,
        metadata: {},
      };
      await loadTemplateFonts(scene);

      const preview = (await editor.renderer.render(scene)) as string;
      scenes.push({ ...scene, preview });
    }

    return { scenes, design: design as IDesign };
  };

  const loadDesignById = useCallback(
    async (designId: string) => {
      if (editor) {
        const design = await api.getPublicDesignById(designId);
        const loadedDesign = await loadGraphicTemplate(design);
        setScenes(loadedDesign.scenes.map(scene => ({ history: [scene], scenePosition: 0 })));
        setCurrentScene(loadedDesign.scenes[0]);
        setCurrentDesign(loadedDesign.design);
      }
    },
    [editor, currentScene],
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
        <Block>Templates</Block>

        <CloseSideBar />
      </Block>
      <Scrollable>
        <div style={{ padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: '1fr 1fr' }}>
            {designs.map(design => (
              <ImageItem
                onClick={() => loadDesignById(design.id)}
                key={design.id}
                preview={`${design.previews[0].src}?tr=w-320`}
              />
            ))}
          </div>
        </div>
      </Scrollable>
    </Block>
  );
}
