/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { ResourceSliceState, setResources } from 'src/store/slices/resources/reducer';
import { store } from 'src/store/store';

//TO DO: Add types
// type Canva = any;
type CanvaCreation = { chapter_id: number; image: string };
type CanvaParam = any;
type StoriettesCreation = any;
type StoriettesParam = any;
type ChapterCreation = any;
type ChapterParam = any;
type GraphicResourcesCreation = any;
type GraphicResourcesParam = any;
type GraphicResources = 'character' | 'background' | 'object' | 'dialog';

const { dispatch } = store;

const CONTENT_TYPE = {
  // Accept: '/',
  'Content-Type': 'application/json',
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { ...CONTENT_TYPE },
});

// api.interceptors.request.use(async req => {
//   const { user } = getState().auth;
//   const mcid = user?.MCID;
//   req.headers = { ...req.headers };
//   if (mcid && !req?.headers?.masterCustomerId) {
//     req.headers.masterCustomerId = mcid;
//   }
//   return req;
// });

//COMIC
export const apisComic = {
  getStoriettes: () => api.get('/storiettes'),
  getStoriettesById: (id: number) => api.get(`/storiettes/${id}`),
  postStoriettes: (data: StoriettesCreation) => api.post('/storiettes', data),
  patchStoriettes: (id: number, data: StoriettesParam) => api.patch(`/storiettes/${id}`, data),
};

//CHAPTERS
export const apisChapters = {
  getCChapters: () => api.get('/chapters'),
  getChaptersById: (id: number) => api.get(`/chapters/${id}`),
  postChapters: (data: ChapterCreation) => api.post('/chapters', data),
  patchChapters: (id: number, data: ChapterParam) => api.patch(`/chapters/${id}`, data),
};

//CANVAS
export const apisCanvas = {
  getCanva: () => api.get('/canvas'),
  getCanvaById: (id: number) => api.get(`/canvas/${id}`),
  postCanva: async ({ image, chapter_id }: CanvaCreation) => {
    const data = new FormData();
    const imageBinary = await (await fetch(image)).blob();
    data.append('image', imageBinary);
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
      const dataMap: ResourceSliceState = { characters: [], images: [], shapes: [], text: [] };
      (data || []).forEach(
        ({ id, image_url, resource_type }: { id: string; resource_type: string; image_url: string }) => {
          switch (resource_type) {
            case 'character':
              dataMap.characters.push({ id, url: image_url });
              break;
            case 'background':
              dataMap.images.push({ id, url: image_url });
              break;
            case 'object':
              dataMap.shapes.push({ id, url: image_url });
              break;
            case 'dialog':
              dataMap.text.push({ id, url: image_url });
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
