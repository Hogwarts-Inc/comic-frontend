import { useMemo } from 'react';

import dynamic from 'next/dynamic';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

import GraphicEditor from './GraphicEditor';

const DesignEditor = dynamic(
  Promise.resolve(() => {
    const engine = useMemo(
      () =>
        new Styletron({
          hydrate: document.getElementsByClassName('_styletron_hydrate_') as never,
        }),
      [],
    );
    return (
      <StyletronProvider value={engine}>
        <GraphicEditor />
      </StyletronProvider>
    );
  }),
  { ssr: false },
);

export default DesignEditor;
