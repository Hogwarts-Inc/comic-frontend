import React, { useEffect, useState } from 'react';

import { CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@components/Button';
import { DialogAddCanva } from '@components/DialogAddCanva';
import { DialogUserQueue } from '@components/DialogUserQueue';
import { Route } from 'src/constants/routes';
import useIsMobile from 'src/hooks/useIsMobile';
import { StoriettesParam, apisChapters } from 'src/services/api';
import { RootState } from 'src/store/rootReducer';
import { resetCanvaCreate, setChapterId } from 'src/store/slices/canva-creator/reducer';

import { Title, Loading, Img, Container, AddCanvaButton, AddCircleOutlineStyle } from './styles';

function Chapter({ isFooterVisible }: { isFooterVisible: boolean }) {
  const {
    query: { chapter },
    push,
    back,
  } = useRouter();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.token);

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
            dispatch(resetCanvaCreate());
            dispatch(setChapterId(+chapter));
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
        <Title variant="h3">{dataChapter?.title}</Title>
        <Grid>
          {dataChapter?.canvas?.map(item => (
            <Img src={item.image_url} alt="" onClick={() => push(`${Route.visualizer}/${item.id}`)} />
          ))}
        </Grid>
        {!!accessToken && (
          <AddCanvaButton variant="text" onClick={handleClickOpen} isFooterVisible={isFooterVisible}>
            <AddCircleOutlineStyle />
          </AddCanvaButton>
        )}
        <DialogAddCanva openDialog={openDialogAddCanva} setOpenDialog={setOpenDialogAddCanva} />
        <DialogUserQueue openDialog={openDialogUserQueue} setOpenDialog={setOpenDialogUserQueue} />
      </Container>
    </Grid>
  );
}
export default Chapter;
