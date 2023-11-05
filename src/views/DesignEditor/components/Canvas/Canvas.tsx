import React from 'react';

import { Canvas as LayerhubCanvas } from '@layerhub-io/react';
import { Grid } from '@mui/material';

import ContextMenu from '../ContextMenu';

function Canvas() {
  return (
    <Grid container xs item>
      <ContextMenu />
      <LayerhubCanvas
        config={{
          background: '#f1f2f6',
          controlsPosition: {
            rotation: 'TOP',
          },
          shadow: {
            blur: 4,
            color: '#fcfcfc',
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </Grid>
  );
}

export default Canvas;
