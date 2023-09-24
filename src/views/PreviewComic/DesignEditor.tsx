/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

import GraphicEditor from './GraphicEditor';
import useDesignEditorContext from '../../hooks/useDesignEditorContext';

const DesignEditor = dynamic(
  Promise.resolve(() => {
    const { displayPreview, setDisplayPreview, setEditorType } = useDesignEditorContext();
    useLayoutEffect(() => {
      setEditorType('GRAPHIC');
    });
    const engine = useMemo(
      () =>
        new Styletron({
          hydrate: document.getElementsByClassName('_styletron_hydrate_') as any,
        }),
      [],
    );
    return (
      <>
        <StyletronProvider value={engine}>
          <GraphicEditor />,
        </StyletronProvider>
      </>
    );
  }),
  { ssr: false },
);

export default DesignEditor;
