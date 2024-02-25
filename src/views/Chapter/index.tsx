import React, { useEffect, useState } from 'react';

import { CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Button from '@components/Button';
import { DialogAddCanva } from '@components/DialogAddCanva';
import { DialogLastThreeCanva } from '@components/DialogLastThreeCanva';
import { DialogUserQueue } from '@components/DialogUserQueue';
import { Route } from 'src/constants/routes';
import useIsMobile from 'src/hooks/useIsMobile';
import { StoriettesParam, apisChapters } from 'src/services/api';
import { RootState } from 'src/store/rootReducer';
import { setChapterQueue } from 'src/store/slices/chapter-queue';
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

  const [openDialogUserQueue, setOpenDialogUserQueue] = useState<boolean>(false);

  const [openDialogThreeCanvas, setOpenDialogThreeCanvas] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [dataChapter, setDataChapter] = useState<StoriettesParam | undefined>();

  const { chapterId, isWaiting, position } = useSelector((state: RootState) => state.chapterQueue);

  const isUserTurn = chapter && chapterId === +chapter && position === 1;
  const [openDialogAddCanva, setOpenDialogAddCanva] = useState<boolean>(!!isUserTurn);

  useEffect(() => {
    if (chapter) {
      apisChapters.getChaptersById(+chapter).then(({ data }) => {
        setDataChapter(data);
        setLoading(false);
      });
    }
  }, [chapter]);

  const handleClickOpen = async () => {
    setLoading(true);
    if (chapter) {
      try {
        const { status: checkQueueStatus } = await apisChapters.getChaptersCheckQueue(+chapter);
        if (checkQueueStatus === 200) {
          try {
            const { status: userAddedStatus, data: userAddedData } = await apisChapters.getAddUserToQueue(+chapter);
            setLoading(false);
            if (userAddedData.position === 1 && userAddedStatus === 200) {
              dispatch(
                setChapterQueue({
                  chapterId: +chapter,
                  position: userAddedData.position,
                  isWaiting: false,
                  isCreating: true,
                }),
              );
              dispatch(resetCanvaCreate());
              dispatch(setChapterId(+chapter));
              setOpenDialogThreeCanvas(true);
            } else {
              toast.error('Surgio un error inesperado y no pudimos agregarte a la cola, intentalo nuevamente.');
            }
          } catch (error: any) {
            if (error.response && error.response.status === 422) {
              if (error.position === 1) {
                dispatch(setChapterId(+chapter));
                setOpenDialogThreeCanvas(true);
              } else if (!isWaiting) {
                setOpenDialogUserQueue(true);
              }
            }
          }
        }
      } catch (error: any) {
        setLoading(false);
        if (error.response && error.response.status === 422) {
          setOpenDialogUserQueue(true);
        } else {
          console.error(error);
        }
      }
    }
  };

  const handleWait = async () => {
    if (!chapter) return;

    const { status: userAddedStatus, data: userAddedData } = await apisChapters.getAddUserToQueue(+chapter);
    try {
      if (userAddedStatus === 200 && userAddedData.position !== 1) {
        dispatch(
          setChapterQueue({
            chapterId: +chapter,
            position: userAddedData.position,
            isWaiting: true,
            isCreating: false,
          }),
        );
        dispatch(resetCanvaCreate());
        dispatch(setChapterId(+chapter));
        toast.success('Fuiste agregado a la cola correctamente.');
      } else {
        toast.error('Surgio un error inesperado y no pudimos agregarte a la cola, intentalo nuevamente.');
      }
      setOpenDialogUserQueue(false);
    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.status === 422) {
        setOpenDialogUserQueue(true);
      }
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
        <DialogUserQueue
          handleWait={handleWait}
          openDialog={openDialogUserQueue}
          setOpenDialog={setOpenDialogUserQueue}
        />
        {chapter && (
          <DialogLastThreeCanva
            openDialog={openDialogThreeCanvas}
            setOpenDialog={setOpenDialogThreeCanvas}
            chapterId={+chapter}
            setOpenDialogAddCanva={setOpenDialogAddCanva}
          />
        )}
      </Container>
    </Grid>
  );
}
export default Chapter;
