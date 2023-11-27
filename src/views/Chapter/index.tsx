/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

import { StoriettesParam, apisChapters } from 'src/services/apiConfig';

import { Title } from './styles';

function Chapter() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState<boolean>(true);
  const [dataChapter, setDataChapter] = useState<StoriettesParam[]>([]);

  useEffect(() => {
    if (id) {
      apisChapters.getChaptersById(id).then(({ data }) => {
        setDataChapter(data);
        setLoading(false);
      });
    }
  }, [id]);

  return loading ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '4rem 0' }}>
      <Title variant="h4">{dataChapter.title}</Title>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {dataChapter?.canvas?.map(item => (
          <img src={item.image_url} alt="" style={{ width: '80vw', height: 'auto', marginRight: '10px' }} />
        ))}
      </div>
    </div>
  );
}
export default Chapter;
