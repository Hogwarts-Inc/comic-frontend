import { toast } from 'react-toastify';

import { apisChapters } from 'src/services/apiConfig';
import { resetChapterQueue } from 'src/store/slices/chapter-queue';

export const getUserQueuePosition = (chapter: number) => apisChapters.getUserQueuePlace(chapter);

export const handleRemoveFromQueue = async (chapterId: number, dispatch: any) => {
  try {
    const { status } = await apisChapters.removeUserFromQueue(chapterId);
    if (status === 200) {
      dispatch(resetChapterQueue());
      toast.success('Fuiste removido de la cola correctamente.');
    }
  } catch (error) {
    toast.error(error.message);
  }
};
