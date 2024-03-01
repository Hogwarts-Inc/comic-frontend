/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from 'react';

import { CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Button from '@components/Button';
import { DialogAddCanva } from '@components/DialogAddCanva';
import { DialogLastThreeCanva } from '@components/DialogLastThreeCanva';
import { DialogUserQueue } from '@components/DialogUserQueue';
import AddCanvaButton from '@components/Icons/addCanvaButton.svg';
import { Route } from 'src/constants/routes';
import { addUserToQueue, handleRemoveFromQueue } from 'src/helpers/chaptersQueue';
import useIsMobile from 'src/hooks/useIsMobile';
import { StoriettesParam, apisChapters } from 'src/services/api';
import { RootState } from 'src/store/rootReducer';

import { Title, Loading, Img, Container, TitleContainer, AddCanvaButtonStyle } from './styles';

function Chapter({ isFooterVisible, dataChapter }: { isFooterVisible: boolean; dataChapter: StoriettesParam | null }) {
  const {
    query: { chapter },
    push,
    back,
  } = useRouter();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const accessToken = useSelector((state: RootState) => state.auth.token);
  const { chapterId, isWaiting, isCreating, position } = useSelector((state: RootState) => state.chapterQueue);

  const [loading, setLoading] = useState<boolean>(true);

  const isUserTurn = useMemo(() => chapter && chapterId === +chapter && position === 1, [chapter, chapterId, position]);

  const [openDialogUserQueue, setOpenDialogUserQueue] = useState<boolean>(false);
  const [openDialogThreeCanvas, setOpenDialogThreeCanvas] = useState<boolean>(false);
  const [openDialogAddCanva, setOpenDialogAddCanva] = useState<boolean>(false);

  useEffect(() => {
    setOpenDialogThreeCanvas(!!isUserTurn);
  }, [isUserTurn]);

  useEffect(() => {
    setLoading(!dataChapter);
  }, [dataChapter]);

  const handleClickOpen = async () => {
    if (!chapter) return;
    try {
      const { status: checkQueueStatus } = await apisChapters.getChaptersCheckQueue(+chapter);
      if (checkQueueStatus === 200) {
        addUserToQueue(+chapter);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 422 && !isWaiting) {
        setOpenDialogUserQueue(true);
      } else {
        console.error(error);
      }
    }
  };

  const handleWait = async () => {
    if (!chapter) return;
    await addUserToQueue(+chapter);
    setOpenDialogUserQueue(false);
  };

  return loading || !dataChapter || !chapter ? (
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
        <TitleContainer>
          <Title variant="h4" style={{ marginBottom: '0.5rem' }}>
            {dataChapter.title}
          </Title>
          <Title>{dataChapter.description}</Title>
        </TitleContainer>
        <Grid container style={{ flexDirection: 'column' }}>
          {dataChapter.canvas.map(item => (
            <Img
              src={item.image_url}
              alt={`Canva: ${item.id}`}
              key={item.id}
              onClick={() => push(`${Route.visualizer}/${item.id}`)}
            />
          ))}
        </Grid>
        {!!accessToken && !isWaiting && !isCreating && (
          <AddCanvaButtonStyle variant="text" onClick={handleClickOpen} isFooterVisible={isFooterVisible}>
            <AddCanvaButton />
          </AddCanvaButtonStyle>
        )}
        <DialogAddCanva
          openDialog={openDialogAddCanva}
          setOpenDialog={setOpenDialogAddCanva}
          onClose={() => {
            if (isCreating && chapterId) {
              handleRemoveFromQueue(chapterId);
            }
          }}
        />
        <DialogUserQueue
          handleWait={handleWait}
          openDialog={openDialogUserQueue}
          setOpenDialog={setOpenDialogUserQueue}
        />
        <DialogLastThreeCanva
          openDialog={openDialogThreeCanvas}
          setOpenDialog={setOpenDialogThreeCanvas}
          chapterId={+chapter}
          setOpenDialogAddCanva={setOpenDialogAddCanva}
        />
      </Container>
    </Grid>
  );
}
export default Chapter;
