/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useMemo, useState } from 'react';

import { PanelType } from 'src/constants/app-options';

type Template = any;
interface IAppContext {
  isMobile: boolean | undefined;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  templates: Template[];
  setTemplates: (templates: Template[]) => void;
  uploads: any[];
  setUploads: (templates: any[]) => void;
  shapes: any[];
  setShapes: (templates: any[]) => void;
  activePanel: PanelType;
  setActivePanel: (option: PanelType) => void;
  activeSubMenu: string | null;
  setActiveSubMenu: (option: string) => void;
  currentTemplate: any;
  setCurrentTemplate: any;
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
  templates: [],
  setTemplates: () => {},
  uploads: [],
  setUploads: () => {},
  shapes: [],
  setShapes: () => {},
  activePanel: '',
  setActivePanel: () => {},
  activeSubMenu: null,
  setActiveSubMenu: () => {},
  currentTemplate: {},
  setCurrentTemplate: {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [uploads, setUploads] = useState<any[]>([]);
  const [shapes, setShapes] = useState<Template[]>([]);
  const [activePanel, setActivePanel] = useState<PanelType>('');
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const context = useMemo(
    () => ({
      isMobile,
      setIsMobile,
      templates,
      setTemplates,
      activePanel,
      setActivePanel,
      shapes,
      setShapes,
      activeSubMenu,
      setActiveSubMenu,
      uploads,
      setUploads,
      currentTemplate,
      setCurrentTemplate,
    }),
    [activePanel, activeSubMenu, currentTemplate, isMobile, shapes, templates, uploads],
  );
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
