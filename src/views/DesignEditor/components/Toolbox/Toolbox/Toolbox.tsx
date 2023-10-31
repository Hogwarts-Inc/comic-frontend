/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';

import { useActiveObject, useEditor } from '@layerhub-io/react';
import { ILayer } from '@layerhub-io/types';
import { Grid } from '@mui/material';

import { ButtonsContainer, Container } from './styles';
import useAppContext from '../../../../../hooks/useAppContext';
import getSelectionType from '../../../../../utils/get-selection-type';
import { SaveCanvaButton } from '../../SaveCanvaButton';
import Items from '../Items';

interface ToolboxState {
  toolbox: string;
}
function Toolbox() {
  const [state, setState] = useState<ToolboxState>({ toolbox: '' });
  const { setActiveSubMenu, isMobile } = useAppContext();
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

  const Component = useMemo(() => Items[state.toolbox], [state.toolbox]);

  return (
    (!!Component || !isMobile) && (
      <Container container item isMobile={!!isMobile} wrap="nowrap">
        <Grid container item overflow="scroll">
          {!!Component && <Component />}
        </Grid>
        {!isMobile && (
          <ButtonsContainer>
            <SaveCanvaButton />
          </ButtonsContainer>
        )}
      </Container>
    )
  );
}

export default Toolbox;
