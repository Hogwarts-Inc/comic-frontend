import { toast } from 'react-toastify';

export const errorHandler = (error: Error) => {
  console.error('Error:', error);

  const errorMessage = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
  toast.error(errorMessage, { autoClose: 5000 });
};
