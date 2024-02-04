import React, { useState } from 'react';

import DefaultLayout from '@components/DefaultLayout';
import Chapter from 'src/views/Chapter';

export default function ChapterVisualizer() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  return (
    <DefaultLayout onFooterIsShowed={setIsFooterVisible}>
      <Chapter isFooterVisible={isFooterVisible} />
    </DefaultLayout>
  );
}
