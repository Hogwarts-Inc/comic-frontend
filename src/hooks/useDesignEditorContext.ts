import { useContext } from 'react';

import { DesignEditorContext } from '../contexts/DesignEditor';

const useDesignEditorContext = () => {
  const {
    editorType,
    setEditorType,
    setDisplayPreview,
    displayPreview,
    currentScene,
    setCurrentScene,
    setScenes,
    scenes,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
    contextMenuSceneRequest,
    setContextMenuSceneRequest,
    currentDesign,
    setCurrentDesign,
  } = useContext(DesignEditorContext);
  return {
    editorType,
    setEditorType,
    setDisplayPreview,
    displayPreview,
    currentScene,
    setCurrentScene,
    setScenes,
    scenes,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
    contextMenuSceneRequest,
    setContextMenuSceneRequest,
    currentDesign,
    setCurrentDesign,
  };
};

export default useDesignEditorContext;
