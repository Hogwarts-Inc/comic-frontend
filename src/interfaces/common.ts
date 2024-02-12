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
