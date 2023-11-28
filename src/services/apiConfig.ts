/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosError } from 'axios';
import i18next from 'i18next';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import { Character, ResourceSliceState, setCharacters, setResources } from 'src/store/slices/resources/reducer';
import { store } from 'src/store/store';

//TO DO: Add types
// type Canva = any;
type CanvaCreation = { chapter_id: number; images: string[] };
type CanvaParam = any;
type StoriettesCreation = any;
//To do: create canva type
export type StoriettesParam = { title: string; id: number; updated_at: string; canvas: any[] };
type CharacterCreation = any;
type CharacterParam = any;
export type ChapterCreation = {
  active: boolean;
  description: string;
  storiette_id: number;
  title: string;
};
type ChapterParam = any;
type GraphicResourcesCreation = any;
type GraphicResourcesParam = any;
type GraphicResources = 'background' | 'object' | 'dialog';
export type Description = { id: string; title: string; text: string };
export type Event = {
  active: boolean;
  descriptions: Description[];
  id: number;
  image_url: string;
  name: string;
};

const { dispatch, getState } = store;

const CONTENT_TYPE = {
  // Accept: '/',
  'Content-Type': 'application/json',
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { ...CONTENT_TYPE },
});

api.interceptors.request.use(req => {
  const { token } = getState().auth;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    toast.success(i18next.t('toast.successCall'));
    return response;
  },
  (error: AxiosError) => {
    toast.error(i18next.t('toast.failCall'));
    return Promise.reject(error);
  },
);

//COMIC
export const apisComic = {
  getStoriettes: () => api.get('/storiettes'),
  getStoriettesById: (id: number) => api.get(`/storiettes/${id}`),
  postStoriettes: (data: StoriettesCreation) => api.post('/storiettes', data),
  patchStoriettes: (id: number, data: StoriettesParam) => api.patch(`/storiettes/${id}`, data),
};

//CHAPTERS
export const apisChapters = {
  getChapters: () => api.get('/chapters'),
  getChaptersById: (id: number) => api.get(`/chapters/${id}`),
  postChapters: (data: ChapterCreation) => api.post('/chapters', data),
  patchChapters: (id: number, data: ChapterParam) => api.patch(`/chapters/${id}`, data),
};

//CANVAS
export const apisCanvas = {
  getCanva: () => api.get('/canvas'),
  getCanvaById: (id: number) => api.get(`/canvas/${id}`),
  postCanva: async ({ images, chapter_id }: CanvaCreation) => {
    const data = new FormData();
    for (const image of images) {
      const response = await fetch(image);
      const imageBlob = await response.blob();
      data.append('images[]', imageBlob);
    }
    data.append('chapter_id', `${chapter_id}`);
    return api.post('/canvas', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      transformRequest: () => data,
    });
  },
  patchCanva: (id: number, data: CanvaParam) => api.patch(`/canvas/${id}`, data),
};

//GRAPHIC RESOURCES
export const apisGraphicResources = {
  getGraphicResources: () =>
    api.get('/graphic_resources').then(({ data }) => {
      const dataMap: ResourceSliceState = { characters: [], background: [], shapes: [], dialog: [] };
      (data || []).forEach(
        ({ id, image_url, resource_type }: { id: string; resource_type: string; image_url: string }) => {
          switch (resource_type) {
            case 'background':
              dataMap.background.push({ id, url: image_url });
              break;
            case 'object':
              dataMap.shapes.push({ id, url: image_url });
              break;
            case 'dialog':
              dataMap.dialog.push({ id, url: image_url });
              break;
            default:
              break;
          }
        },
      );
      dispatch(setResources(dataMap));
    }),
  getGraphicResourcesById: (id: number) => api.get(`/graphic_resources/${id}`),
  getGraphicResourcesByType: (type: GraphicResources) =>
    api.get(`/graphic_resources/resource_for_type?resource_type=${type}`),
  postGraphicResources: (data: GraphicResourcesCreation) => api.post('/graphic_resources', data),
  patchGraphicResources: (id: number, data: GraphicResourcesParam) => api.patch(`/graphic_resources/${id}`, data),
};

export const apisCharacter = {
  getCharacters: () =>
    api.get('/characters').then(({ data }) => {
      const characters: Character[] = (data || []).map(
        ({
          id,
          name,
          images_urls,
          descriptions,
        }: {
          id: string;
          name: string;
          images_urls: string[];
          descriptions: { id: string; title: string; text: string }[];
        }) => {
          const character: Character = {
            descriptions,
            id,
            name,
            images: images_urls.map(url => ({ id: nanoid(), url })),
          };
          return character;
        },
      );
      dispatch(setCharacters(characters));
    }),
  getCharacterById: (id: number) => api.get(`/characters/${id}`),
  postCharacter: (data: CharacterCreation) => api.post('/characters', data),
  patchCharacter: (id: number, data: CharacterParam) => api.patch(`/characters/${id}`, data),
};

//Event
export const apisEvents = {
  getEvent: () => api.get<Event[]>('/conventions'),
};
