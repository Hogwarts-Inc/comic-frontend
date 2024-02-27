import React, { useState } from 'react';

import { GetServerSideProps } from 'next';

import DefaultLayout from '@components/DefaultLayout';
import { StoriettesParam, apisChapters } from 'src/services/api';
import Chapter from 'src/views/Chapter';

interface ChapterVisualizerProps {
  dataChapter: StoriettesParam | null;
}

export const getServerSideProps = (async context => {
  let data: ChapterVisualizerProps = {
    dataChapter: null,
  };
  if (context.query.chapter && context.query.chapter !== 'undefined') {
    try {
      const { data: dataChapter } = await apisChapters.getChaptersById(+context.query.chapter);
      data = { dataChapter };
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  }

  return { props: data };
}) satisfies GetServerSideProps<ChapterVisualizerProps>;

export default function ChapterVisualizer({ dataChapter }: ChapterVisualizerProps) {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  return (
    <DefaultLayout onFooterIsShowed={setIsFooterVisible}>
      <Chapter isFooterVisible={isFooterVisible} dataChapter={dataChapter} />
    </DefaultLayout>
  );
}
