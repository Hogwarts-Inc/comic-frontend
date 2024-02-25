import { toast } from 'react-toastify';

import { apisChapters } from 'src/services/api';
import { resetCanvaCreate } from 'src/store/slices/canva-creator/reducer';
import { resetChapterQueue } from 'src/store/slices/chapter-queue';
import { store } from 'src/store/store';

export const getUserQueuePosition = (chapter: number) => apisChapters.getUserQueuePlace(chapter);

export const handleRemoveFromQueue = async (chapterId: number) => {
  const { dispatch } = store;
  try {
    const { status } = await apisChapters.removeUserFromQueue(chapterId);
    if (status === 200) {
      dispatch(resetCanvaCreate());
      dispatch(resetChapterQueue());
      toast.success('Fuiste removido de la cola correctamente.');
    }
  } catch (error) {
    toast.error(error.message);
  }
};
