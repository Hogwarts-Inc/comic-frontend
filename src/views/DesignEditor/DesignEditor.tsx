/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import React from 'react';

import { Client, Server } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

import GraphicEditor from './GraphicEditor';

const getHydrateClass = () => document.getElementsByClassName('_styletron_hydrate_');

const engine =
  typeof window === 'undefined'
    ? new Server()
    : new Client({
        hydrate: getHydrateClass() as any,
      });

const DesignEditor = () => (
  <StyletronProvider value={engine}>
    <GraphicEditor />
  </StyletronProvider>
);

export default DesignEditor;
