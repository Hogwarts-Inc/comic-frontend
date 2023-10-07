/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';

import { useActiveObject, useEditor } from '@layerhub-io/react';
import { ILayer } from '@layerhub-io/types';
import { styled } from 'baseui';

import Items from './Items';
import useAppContext from '../../../../hooks/useAppContext';
import getSelectionType from '../../../../utils/get-selection-type';

interface ToolboxState {
  toolbox: string;
}

const Container = styled('div', () => ({
  boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 1px',
  height: '50px',
  display: 'flex',
}));

const Toolbox = () => {
  const [state, setState] = useState<ToolboxState>({ toolbox: '' });
  const { setActiveSubMenu } = useAppContext();
  const activeObject = useActiveObject() as ILayer;
  const editor = useEditor();

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
  }, [activeObject]);

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

  const Component = useMemo(() => Items[state.toolbox], [state.toolbox]);

  return <Container>{Component && <Component />}</Container>;
};

export default Toolbox;
