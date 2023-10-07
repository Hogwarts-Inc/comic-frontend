/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';

import { useActiveObject, useEditor } from '@layerhub-io/react';
import { ILayer } from '@layerhub-io/types';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';

import { ButtonsContainer, ButtonsSeparator, Container } from './styles';
import useAppContext from '../../../../../hooks/useAppContext';
import getSelectionType from '../../../../../utils/get-selection-type';
import Items from '../Items';

interface ToolboxState {
  toolbox: string;
}

const Toolbox = () => {
  const [state, setState] = useState<ToolboxState>({ toolbox: '' });
  const { setActiveSubMenu } = useAppContext();
  const activeObject = useActiveObject() as ILayer;
  const editor = useEditor();
  const { t } = useTranslation();

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
    <Container>
      {Component && <Component />}
      <ButtonsContainer>
        <Button onClick={() => alert('TODO: import')}>{t('navbar.import')}</Button>
        <ButtonsSeparator />
        <Button onClick={() => alert('TODO: save')}>{t('navbar.save')}</Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Toolbox;