/* eslint-disable no-unused-vars */
import { IFrame, IScene } from '@layerhub-io/types';
import { nanoid } from 'nanoid';

export const getDefaultTemplate: ({ width, height }: IFrame) => IScene = ({ width, height }) => ({
  id: nanoid(),
  frame: {
    width,
    height,
  },
  layers: [
    {
      id: 'background',
      name: 'Initial Frame',
      left: 0,
      top: 0,
      width,
      height,
      type: 'Background',
      fill: '#ffffff',
      metadata: {},
    },
  ],
  metadata: {},
});
