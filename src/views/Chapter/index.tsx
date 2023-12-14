import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

import { DialogAddCanva } from '@components/DialogAddCanva';
import { DialogUserQueue } from '@components/DialogUserQueue';
import { Route } from 'src/constants/routes';
import { StoriettesParam, apisChapters } from 'src/services/apiConfig';

import { Title, Loading, Img, Container, ImgWrapper, AddCanvaButton, AddCircleOutlineStyle } from './styles';

function Chapter() {
  const {
    query: { chapter },
    push,
  } = useRouter();
  const [openDialogAddCanva, setOpenDialogAddCanva] = useState<boolean>(false);
  const [openDialogUserQueue, setOpenDialogUserQueue] = useState<boolean>(false);

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

  const handleClickOpen = () => {
    setLoading(true);
    if (chapter) {
      apisChapters.getChaptersCheckQueue(+chapter).then(({ status }) => {
        setLoading(false);

        if (status === 200) {
          setOpenDialogAddCanva(true);
        } else {
          setOpenDialogUserQueue(true);
        }
      });
    }
  };

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
      <AddCanvaButton variant="text" onClick={handleClickOpen}>
        <AddCircleOutlineStyle />
      </AddCanvaButton>
      <DialogAddCanva openDialog={openDialogAddCanva} setOpenDialog={setOpenDialogAddCanva} />
      <DialogUserQueue openDialog={openDialogUserQueue} setOpenDialog={setOpenDialogUserQueue} />
    </Container>
  );
}
export default Chapter;
