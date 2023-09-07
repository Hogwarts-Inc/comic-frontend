import { useContext } from 'react';

import { AppContext } from '../contexts/AppContext';

const useIsMobile = () => {
  const { isMobile } = useContext(AppContext);
  return isMobile;
};

export default useIsMobile;
