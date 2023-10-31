/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';

import { useActiveObject, useEditor } from '@layerhub-io/react';
import { ILayer } from '@layerhub-io/types';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';
import { Route } from 'src/constants/routes';
import useDesignEditorContext from 'src/hooks/useDesignEditorContext';
import { apisCanvas } from 'src/services/apiConfig';

import { ButtonsContainer, Container } from './styles';
import useAppContext from '../../../../../hooks/useAppContext';
import getSelectionType from '../../../../../utils/get-selection-type';
import Items from '../Items';

interface ToolboxState {
  toolbox: string;
}
function Toolbox() {
  const [state, setState] = useState<ToolboxState>({ toolbox: '' });
  const { setActiveSubMenu } = useAppContext();
  const { scenes } = useDesignEditorContext();
  const activeObject = useActiveObject() as ILayer;
  const editor = useEditor();
  const { t } = useTranslation();
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const selectionType = getSelectionType(activeObject);
    if (selectionType) {
      if (selectionType.length > 1) {
        setState({ toolbox: 'Multiple' });
      } else {
        setState({ toolbox: selectionType[0] });
      }
    } else {
      setState({ toolbox: '' });
      setActiveSubMenu('');
    }
  }, [activeObject, setActiveSubMenu]);

  useEffect(() => {
    const watcher = async () => {
      if (activeObject) {
        const selectionType = getSelectionType(activeObject) as any;

        if (selectionType.length > 1) {
          setState({ toolbox: 'Multiple' });
        } else {
          setState({ toolbox: selectionType[0] });
        }
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
  }, [editor, activeObject]);

  const uploadCanva = async () => {
    setIsSaveLoading(true);
    try {
      for (const { history, scenePosition } of scenes || []) {
        if (history[scenePosition].preview) {
          await apisCanvas.postCanva({ chapter_id: 1, image: history[scenePosition].preview as string });
        }
      }
    } catch (e) {
      // TODO handle error
    }
    push(Route.home);
    setIsSaveLoading(false);
  };

  const Component = useMemo(() => Items[state.toolbox], [state.toolbox]);

  return (
    <Container>
      {Component && <Component />}
      <ButtonsContainer>
        <Button onClick={uploadCanva} isLoading={isSaveLoading}>
          {t('navbar.save')}
        </Button>
      </ButtonsContainer>
    </Container>
  );
}

export default Toolbox;
