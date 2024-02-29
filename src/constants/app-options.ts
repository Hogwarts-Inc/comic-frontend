/* eslint-disable indent */
export const BASE_ITEMS = [
  {
    id: 'images',
    name: 'Images',
  },
  {
    id: 'text',
    name: 'Text',
  },
  {
    id: 'characters',
    name: 'Characters',
  },
  {
    id: 'shapes',
    name: 'Shapes',
  },
  {
    id: 'uploads',
    name: 'Uploads',
  },
  ...(process.env.NEXT_PUBLIC_IMAGE_TOGGLE === 'true'
    ? [
        {
          id: 'imageGeneration',
          name: 'ImageGeneration',
        },
      ]
    : []),
];

export type PanelType = 'Images' | 'Text' | 'Shapes' | 'Characters' | 'Uploads' | '';
