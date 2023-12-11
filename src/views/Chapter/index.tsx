/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

import { StoriettesParam, apisChapters } from 'src/services/apiConfig';

import { Title, Loading, Img, Container, ImgWrapper } from './styles';

function Chapter() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState<boolean>(true);
  const [dataChapter, setDataChapter] = useState<StoriettesParam | undefined>();

  useEffect(() => {
    if (id) {
      apisChapters.getChaptersById(+id).then(({ data }) => {
        setDataChapter(data);
        setLoading(false);
      });
    }
  }, [id]);

  return loading ? (
    <Loading>
      <CircularProgress />
    </Loading>
  ) : (
    <Container>
      <Title variant="h4">{dataChapter?.title}</Title>
      <ImgWrapper>
        {dataChapter?.canvas?.map(item => (
          <Img src={item.image_url} alt="" />
        ))}
      </ImgWrapper>
    </Container>
  );
}
export default Chapter;
