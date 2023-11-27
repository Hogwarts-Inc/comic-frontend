/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { StoriettesParam, apisChapters } from 'src/services/apiConfig';

function Chapter() {
  const router = useRouter();
  const { id } = router.query;

  const [dataChapter, setDataChapter] = useState<StoriettesParam[]>([]);

  useEffect(() => {
    if (id) {
      apisChapters.getChaptersById(id).then(({ data }) => {
        setDataChapter(data);
      });
    }
  }, [id]);

  console.log({ dataChapter });

  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {dataChapter.canvas.map(item => (
        <img src={item.image_url} alt="" style={{ width: '200px', height: 'auto', marginRight: '10px' }} />
      ))}
    </div>
  );
}
export default Chapter;
