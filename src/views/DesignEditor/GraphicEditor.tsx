import React, { useEffect } from 'react';

import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import { handleRemoveFromQueue } from 'src/helpers/chaptersQueue';
import useIsMobile from 'src/hooks/useIsMobile';
import { RootState } from 'src/store/rootReducer';

import Canvas from './components/Canvas';
import Graphic from './components/Footer/Graphic';
import Panels from './components/Panels';
import Toolbox from './components/Toolbox';

const GraphicEditor = () => {
  const isMobile = useIsMobile();
  const { chapterId } = useSelector((state: RootState) => state.chapterQueue);

  useEffect(
    () => () => {
      handleRemoveFromQueue(chapterId);
    },
    [],
  );

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
