export interface Page {
  id: string;
  name: string;
}

export interface FontItem {
  name: string;
  url: string;
}

export interface ChapterData {
  title: string;
  description: string;
  files: string[];
}

export interface CanvaData {
  files: string[];
}
