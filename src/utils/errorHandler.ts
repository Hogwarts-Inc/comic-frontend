import i18next from 'i18next';
import { toast } from 'react-toastify';

export const errorHandler = (error: Error) => {
  console.error('Error:', error);

  const errorMessage = i18next.t('errorHandler');
  toast.error(errorMessage, { autoClose: 5000 });
};
