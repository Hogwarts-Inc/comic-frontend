import { useContext } from 'react';

import { DesignEditorContext } from '../contexts/DesignEditor';

const useDesignEditorContext = () => {
  const {
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
    isSidebarOpen,
    setIsSidebarOpen,
  } = useContext(DesignEditorContext);
  return {
    isSidebarOpen,
    setIsSidebarOpen,
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
