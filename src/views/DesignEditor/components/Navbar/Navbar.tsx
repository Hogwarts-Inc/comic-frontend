/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';

import { useEditor } from '@layerhub-io/react';
import { IScene } from '@layerhub-io/types';
import { styled, ThemeProvider, DarkTheme } from 'baseui';
import { Block } from 'baseui/block';
import { Button, KIND } from 'baseui/button';

import DesignTitle from './DesignTitle';
import Github from '../../../../components/Icons/Github';
import Logo from '../../../../components/Icons/Logo';
import Play from '../../../../components/Icons/Play';
import useDesignEditorContext from '../../../../hooks/useDesignEditorContext';
import { IDesign } from '../../../../interfaces/DesignEditor';
import { loadTemplateFonts } from '../../../../utils/fonts';
import { loadVideoEditorAssets } from '../../../../utils/video';

const Container = styled('div', ({ $theme }) => ({
  height: '64px',
  background: $theme.colors.black,
  display: 'grid',
  padding: '0 1.25rem',
  gridTemplateColumns: '380px 1fr 380px',
  alignItems: 'center',
}));

function Navbar() {
  const { setDisplayPreview, setScenes, setCurrentDesign, currentDesign, scenes } = useDesignEditorContext();
  const editor = useEditor();
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const makeDownload = (data: object) => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = 'template.json';
    a.click();
  };

  const parseGraphicJSON = () => {
    const currentScene = editor.scene.exportToJSON();

    const updatedScenes = scenes.map(({ history, scenePosition }) => {
      const scn = history[scenePosition];
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          layers: currentScene.layers,
          name: currentScene.name,
        };
      }
      return {
        id: scn.id,
        layers: scn.layers,
        name: scn.name,
      };
    });

    if (currentDesign) {
      const graphicTemplate: IDesign = {
        id: currentDesign.id,
        type: 'GRAPHIC',
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        previews: [],
        published: false,
      };
      makeDownload(graphicTemplate);
    } else {
      console.log('NO CURRENT DESIGN');
    }
  };

  const makeDownloadTemplate = async () => {
    if (editor) {
      parseGraphicJSON();
    }
  };

  const loadGraphicTemplate = async (payload: IDesign) => {
    const newScenes = [];
    const { scenes: scns, ...design } = payload;

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
      };
      const loadedScene = await loadVideoEditorAssets(scene);
      await loadTemplateFonts(loadedScene);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      newScenes.push({ ...loadedScene, preview });
    }

    return { scenes: newScenes, design };
  };

  const handleImportTemplate = useCallback(
    async (data: any) => {
      const template = await loadGraphicTemplate(data);

      if (template) {
        setScenes(template.scenes.map(scene => ({ history: [scene], scenePosition: 0 })));
        setCurrentDesign({ ...template.design, scenes: [] });
      }
    },
    [editor],
  );

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = res => {
        const result = res.target!.result as string;
        const design = JSON.parse(result);
        handleImportTemplate(design);
      };
      reader.onerror = err => {
        console.log(err);
      };

      reader.readAsText(file);
    }
  };

  return (
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ color: '#ffffff' }}>
          <Logo size={36} />
        </div>
        <DesignTitle />
        <Block $style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <input
            multiple={false}
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFileRef}
            style={{ display: 'none' }}
          />
          <Button
            size="compact"
            onClick={handleInputFileRefClick}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: '4px',
                },
              },
            }}>
            Import
          </Button>

          <Button
            size="compact"
            onClick={makeDownloadTemplate}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: '4px',
                },
              },
            }}>
            Export
          </Button>
          <Button
            size="compact"
            onClick={() => setDisplayPreview(true)}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: '4px',
                },
              },
            }}>
            <Play size={24} />
          </Button>

          <Button
            size="compact"
            onClick={() => window.location.replace('https://github.com/layerhub-io/react-design-editor')}
            kind={KIND.tertiary}>
            <Github size={24} />
          </Button>

          <Button
            style={{ marginLeft: '0.5rem' }}
            size="compact"
            onClick={() => window.location.replace('https://editor.layerhub.io')}
            kind={KIND.primary}>
            Try PRO
          </Button>
        </Block>
      </Container>
    </ThemeProvider>
  );
}

export default Navbar;
