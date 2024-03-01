import React, { useState } from 'react';

import { GetServerSideProps } from 'next';

import DefaultLayout from '@components/DefaultLayout';
import { StoriettesParam, apisChapters } from 'src/services/api';
import { BasicProps, getProps } from 'src/utils/getProps';
import Chapter from 'src/views/Chapter';

interface ChapterVisualizerProps extends BasicProps {
  dataChapter: StoriettesParam | null;
}

export const getServerSideProps = (async context => {
  const { props } = await getProps(context);
  let data: ChapterVisualizerProps = {
    ...props,
    dataChapter: null,
  };
  if (context.query.chapter && context.query.chapter !== 'undefined') {
    try {
      const { data: dataChapter } = await apisChapters.getChaptersById(+context.query.chapter);
      data = { ...data, dataChapter };
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  }

  return { props: data };
}) satisfies GetServerSideProps<ChapterVisualizerProps>;

export default function ChapterVisualizer({ dataChapter, accessToken, profilePicture }: ChapterVisualizerProps) {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  return (
    <DefaultLayout onFooterIsShowed={setIsFooterVisible} profilePicture={profilePicture} accessToken={accessToken}>
      <Chapter isFooterVisible={isFooterVisible} dataChapter={dataChapter} />
    </DefaultLayout>
  );
}
