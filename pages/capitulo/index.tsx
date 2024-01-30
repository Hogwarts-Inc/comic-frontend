import React from 'react';

import ChapterPreviewer from '@components/ChaptersPreview';
import DefaultLayout from '@components/DefaultLayout';
import useIsMobile from 'src/hooks/useIsMobile';

function Visualizer() {
  const isMobile = useIsMobile();
  return (
    <DefaultLayout disableFooter={isMobile}>
      <ChapterPreviewer />
    </DefaultLayout>
  );
}

export default Visualizer;
