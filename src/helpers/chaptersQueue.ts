/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';

import { apisChapters } from 'src/services/api';
import { resetCanvaCreate, setChapterId } from 'src/store/slices/canva-creator/reducer';
import { resetChapterQueue, setChapterQueue } from 'src/store/slices/chapter-queue';
import { store } from 'src/store/store';

const { dispatch } = store;

export const getUserQueuePosition = (chapter: number) => apisChapters.getUserQueuePlace(chapter);

export const handleRemoveFromQueue = async (chapterId: number) => {
  try {
    const { status } = await apisChapters.removeUserFromQueue(chapterId);
    if (status === 200) {
      dispatch(resetCanvaCreate());
      dispatch(resetChapterQueue());
      toast.success('Fuiste removido de la cola correctamente.');
    }
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const addUserToQueue = async (chapter: number) => {
  try {
    const { status: userAddedStatus, data: userAddedData } = await apisChapters.getAddUserToQueue(chapter);
    if (userAddedStatus === 200) {
      dispatch(
        setChapterQueue({
          chapterId: chapter,
          position: userAddedData.position,
          isWaiting: userAddedData.position !== 1,
          isCreating: userAddedData.position === 1,
        }),
      );
      if (userAddedData.position !== 1) toast.success('Fuiste agregado a la cola correctamente.');
      dispatch(resetCanvaCreate());
      dispatch(setChapterId(+chapter));
    } else {
      toast.error('Surgio un error inesperado y no pudimos agregarte a la cola, intentalo nuevamente.');
    }
  } catch (error) {
    toast.error('Surgio un error inesperado y no pudimos agregarte a la cola, intentalo nuevamente.');
  }
};
