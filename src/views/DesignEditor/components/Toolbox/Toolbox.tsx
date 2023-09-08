/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useActiveObject, useEditor } from '@layerhub-io/react';
import { ILayer } from '@layerhub-io/types';
import { styled } from 'baseui';

import Items from './Items';
import useAppContext from '../../../../hooks/useAppContext';
import getSelectionType from '../../../../utils/get-selection-type';

const DEFAULT_TOOLBOX = 'Canvas';

interface ToolboxState {
  toolbox: string;
}

const Container = styled('div', () => ({
  boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 1px',
  height: '50px',
  display: 'flex',
}));

const Toolbox = () => {
  const [state, setState] = React.useState<ToolboxState>({ toolbox: 'Text' });
  const { setActiveSubMenu } = useAppContext();
  const activeObject = useActiveObject() as ILayer;
  const editor = useEditor();

  React.useEffect(() => {
    const selectionType = getSelectionType(activeObject);
    if (selectionType) {
      if (selectionType.length > 1) {
        setState({ toolbox: 'Multiple' });
      } else {
        setState({ toolbox: selectionType[0] });
      }
    } else {
      setState({ toolbox: DEFAULT_TOOLBOX });
      setActiveSubMenu('');
    }
  }, [activeObject]);

  React.useEffect(() => {
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

  const Component = Items[state.toolbox];

  return <Container>{Component ? <Component /> : state.toolbox}</Container>;
};

export default Toolbox;
