import React, { useEffect, useState } from 'react';

import { CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';
import { DialogAddCanva } from '@components/DialogAddCanva';
import { DialogUserQueue } from '@components/DialogUserQueue';
import { Route } from 'src/constants/routes';
import { StoriettesParam, apisChapters } from 'src/services/apiConfig';

import { Title, Loading, Img, Container, ImgWrapper, AddCanvaButton, AddCircleOutlineStyle } from './styles';
import useIsMobile from 'src/hooks/useIsMobile';

function Chapter() {
  const {
    query: { chapter },
    push,
    back,
  } = useRouter();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

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
      apisChapters
        .getChaptersCheckQueue(+chapter)
        .then(({ status }) => {
          setLoading(false);

          if (status === 200) {
            setOpenDialogAddCanva(true);
          }
        })
        .catch(error => {
          setLoading(false);
          if (error.response && error.response.status === 422) {
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
    <Grid item container direction="column">
      <Grid
        container
        item
        xs="auto"
        justifyContent={isMobile ? 'space-between' : 'left'}
        margin={isMobile ? '1rem' : '1rem 1rem 0 '}>
        <Button onClick={back}>{t('back')}</Button>
      </Grid>
      <Container container item>
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
    </Grid>
  );
}
export default Chapter;
