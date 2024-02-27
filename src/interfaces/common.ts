// eslint-disable-next-line import/no-cycle
import { CanvaParam } from 'src/services/api';

export interface Page {
  id: string;
  name: string;
}

export interface FontItem {
  name: string;
  url: string;
}

export type ContextType = 'chapter' | 'canva';

export interface ChapterData {
  title: string;
  description: string;
  files: string[];
  chapterId?: number;
}

export interface CanvaChapter {
  canvas: CanvaParam[];
}
