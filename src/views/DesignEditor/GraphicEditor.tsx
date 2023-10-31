import React from 'react';

import { Grid } from '@mui/material';

import useIsMobile from 'src/hooks/useIsMobile';

import Canvas from './components/Canvas';
import Graphic from './components/Footer/Graphic';
import Panels from './components/Panels';
import Toolbox from './components/Toolbox';

const GraphicEditor = () => {
  const isMobile = useIsMobile();
  return (
    <Grid container wrap="nowrap" direction={isMobile ? 'column' : 'row'}>
      <Grid container item xs="auto" direction={isMobile ? 'column' : 'row'}>
        <Panels />
      </Grid>
      <Grid container item xs direction="column" overflow="hidden">
        <Toolbox />
        <Canvas />
        <Graphic />
      </Grid>
    </Grid>
  );
};

export default GraphicEditor;
