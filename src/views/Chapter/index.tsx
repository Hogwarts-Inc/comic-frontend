/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

import { Route } from 'src/constants/routes';
import { StoriettesParam, apisChapters } from 'src/services/apiConfig';

import { Title, Loading, Img, Container, ImgWrapper } from './styles';

function Chapter() {
  const {
    query: { chapter },
    push,
  } = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [dataChapter, setDataChapter] = useState<StoriettesParam | undefined>();

  useEffect(() => {
    if (chapter) {
      apisChapters.getChaptersById(+chapter).then(({ data }) => {
        setDataChapter(data);
        setLoading(false);
      });
    }
  }, [chapter]);

  return loading ? (
    <Loading>
      <CircularProgress />
    </Loading>
  ) : (
    <Container>
      <Title variant="h4">{dataChapter?.title}</Title>
      <ImgWrapper>
        {dataChapter?.canvas?.map(item => (
          <Img src={item.image_url} alt="" onClick={() => push(`${Route.visualizer}/${item.id}`)} />
        ))}
      </ImgWrapper>
    </Container>
  );
}
export default Chapter;
