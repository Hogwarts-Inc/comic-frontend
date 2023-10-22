/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';

import { IScene } from '@layerhub-io/types';

import { ContextMenuSceneRequest, ContextMenuTimelineRequest, IDesign } from '../interfaces/DesignEditor';

export type ScenesWithPosition = { history: IScene[]; scenePosition: number }[];

interface ISceneEditorContext {
  scenes: ScenesWithPosition;
  setScenes: (value: ((prevState: ScenesWithPosition) => ScenesWithPosition) | ScenesWithPosition) => void;
  currentScene: IScene | null;
  setCurrentScene: React.Dispatch<React.SetStateAction<IScene | null>>;
  currentDesign: IDesign;
  setCurrentDesign: React.Dispatch<React.SetStateAction<IDesign>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayPreview: boolean;
  setDisplayPreview: React.Dispatch<React.SetStateAction<boolean>>;
  currentPreview: string;
  setCurrentPreview: React.Dispatch<React.SetStateAction<string>>;
  maxTime: number;
  setMaxTime: React.Dispatch<React.SetStateAction<number>>;
  contextMenuTimelineRequest: ContextMenuTimelineRequest;
  setContextMenuTimelineRequest: React.Dispatch<React.SetStateAction<ContextMenuTimelineRequest>>;
  contextMenuSceneRequest: ContextMenuTimelineRequest;
  setContextMenuSceneRequest: React.Dispatch<React.SetStateAction<ContextMenuTimelineRequest>>;
}

export const DesignEditorContext = React.createContext<ISceneEditorContext>({
  scenes: [],
  setScenes: () => {},
  currentScene: null,
  setCurrentScene: () => {},
  currentDesign: {
    id: '',
    frame: {
      width: 1,
      height: 1,
    },
    metadata: {},
    name: '',
    previews: [],
    scenes: [],
    type: '',
    published: false,
  },
  setCurrentDesign: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  displayPreview: false,
  setDisplayPreview: () => {},
  currentPreview: '',
  setCurrentPreview: () => {},
  maxTime: 0,
  setMaxTime: () => {},
  contextMenuTimelineRequest: {
    id: '',
    left: 0,
    top: 0,
    visible: false,
  },
  setContextMenuTimelineRequest: () => {},
  contextMenuSceneRequest: {
    id: '',
    left: 0,
    top: 0,
    visible: false,
  },
  setContextMenuSceneRequest: () => {},
});

export function DesignEditorProvider({ children }: { children: React.ReactNode }) {
  const [scenes, setScenes] = React.useState<ScenesWithPosition>([]);
  const [currentScene, setCurrentScene] = React.useState<IScene | null>(null);
  const [currentDesign, setCurrentDesign] = React.useState<IDesign>({
    id: '',
    frame: {
      width: 1,
      height: 1,
    },
    metadata: {},
    name: '',
    previews: [],
    scenes: [],
    type: '',
    published: false,
  });
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [displayPreview, setDisplayPreview] = React.useState<boolean>(false);
  const [currentPreview, setCurrentPreview] = React.useState<string>('');
  const [maxTime, setMaxTime] = React.useState(5000);
  const [contextMenuTimelineRequest, setContextMenuTimelineRequest] = React.useState<ContextMenuTimelineRequest>({
    id: '',
    left: 0,
    top: 0,
    visible: false,
  });
  const [contextMenuSceneRequest, setContextMenuSceneRequest] = React.useState<ContextMenuSceneRequest>({
    id: '',
    left: 0,
    top: 0,
    visible: false,
  });
  const context = useMemo(
    () => ({
      scenes,
      setScenes,
      currentScene,
      setCurrentScene,
      currentDesign,
      setCurrentDesign,
      isSidebarOpen,
      setIsSidebarOpen,
      displayPreview,
      setDisplayPreview,
      currentPreview,
      setCurrentPreview,
      maxTime,
      setMaxTime,
      contextMenuTimelineRequest,
      setContextMenuTimelineRequest,
      contextMenuSceneRequest,
      setContextMenuSceneRequest,
    }),
    [
      contextMenuSceneRequest,
      contextMenuTimelineRequest,
      currentDesign,
      currentPreview,
      currentScene,
      displayPreview,
      isSidebarOpen,
      maxTime,
      scenes,
    ],
  );
  return <DesignEditorContext.Provider value={context}>{children}</DesignEditorContext.Provider>;
}
