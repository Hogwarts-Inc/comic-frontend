import { IFrame, IScene, ILayer } from '@layerhub-io/types';

export interface Page {
  id: string;
  name: string;
  preview: string;
}

export interface ContextMenuTimelineRequest {
  id: string;
  top: number;
  left: number;
  visible: boolean;
}

export interface ContextMenuSceneRequest {
  id: string;
  top: number;
  left: number;
  visible: boolean;
}

export interface IDesign {
  id: string;
  name: string;
  frame: IFrame;
  type: string;
  scenes: { id: string; duration?: number; layers: Partial<ILayer>[]; name: string | undefined }[];
  previews: { id: string; src: string }[];
  metadata: object;
  published: boolean;
}

export interface IComponent extends Omit<IScene, 'preview'> {
  published: boolean;
  preview: { src: string };
}
