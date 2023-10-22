import { useContext } from 'react';

import { DesignEditorContext } from '../contexts/DesignEditor';

const useDesignEditorScenes = () => {
  const { scenes } = useContext(DesignEditorContext);
  return scenes;
};

export default useDesignEditorScenes;
