/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosError } from 'axios';
import i18next from 'i18next';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import { CanvaChapter } from 'src/interfaces/common';
import { Character, ResourceSliceState, setCharacters, setResources } from 'src/store/slices/resources/reducer';
import { store } from 'src/store/store';

export type UserAttributes = {
  email: string;
  family_name: string;
  given_name: string;
  id: number;
  image_url: string;
  name: string;
  nft_url: string | null;
  sub: string;
  updated_at: string;
};

type Comment = {
  id: number;
  text: string;
  user_attributes: UserAttributes;
};

type NftData = {
  wallet_address: string;
  token_id: string;
  transferred: boolean;
};

export type TransferNFTData = {
  chain: string;
  fromAddress: string;
  toAddress: string;
  tokenId: string;
  tokenMintAddress: string;
};

type CanvaResponse = {
  chapter_id: number;
  comments: Comment[];
  nft_data: NftData;
  id: number;
  image_url: string;
  likes: number;
  title: string;
  user_attributes: UserAttributes;
  user_profile_id: string;
  current_user_likes: boolean;
};

//TO DO: Add types
// type Canva = any;
type CanvaCreation = { chapter_id: number; images: string[] };
export type CanvaParam = { image_url: string; id: number };
type StoriettesCreation = any;
//To do: create canva type
export type StoriettesParam = {
  title: string;
  description: string;
  id: number;
  updated_at: string;
  canvas: CanvaParam[];
  chapter_like_count: number;
};
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
export type User = { id: number; name: string; email: string; picture: string };

const { dispatch, getState } = store;

const CONTENT_TYPE = {
  // Accept: '/',
  'Content-Type': 'application/json',
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND,
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
  (response: AxiosResponse) =>
    // toast.success(i18next.t('toast.successCall'));
    response,
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
  getChaptersById: (id: number) => api.get<StoriettesParam>(`/chapters/${id}`),
  getChaptersCheckQueue: (id: number) => api.get(`/chapters/${id}/check_queue`),
  postChapters: (data: ChapterCreation) => api.post('/chapters', data),
  patchChapters: (id: number, data: ChapterParam) => api.patch(`/chapters/${id}`, data),
  getAddUserToQueue: (id: number) => api.get(`/chapters/${id}/add_user_to_queue`),
  getUserQueuePlace: (id: number) => api.get<any>(`/chapters/${id}/user_position_in_queue`),
  removeUserFromQueue: (id: number) => api.get<any>(`/chapters/${id}/remove_user_from_queue`),
  getThreeLastCanva: (id: number) => api.get<CanvaChapter>(`/chapters/${id}/last_three_canvas`),
};

//CANVAS
export const apisCanvas = {
  getCanva: () => api.get<CanvaResponse[]>('/canvas'),
  getCanvaById: ({ canvaId, token }: { canvaId: number; token: string }) =>
    api.get<CanvaResponse>(`/canvas/${canvaId}`, { headers: { Authorization: `Bearer ${token}` } }),
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

export const apisCanvasLike = {
  postCanvasLike: (canvaId: number) => api.post('likes', { canva_id: canvaId }),
  deleteCanvasLike: (canvaId: number) => api.delete(`/canvas/${canvaId}/remove_like`),
};

export const apisCanvasComment = {
  postCanvasComment: (canvaId: number, comment: string) =>
    api.post('opinions', { canva_id: canvaId, text: comment, active: true }),
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

//USER PROFILE
export const apiUserProfile = {
  postUserProfile: () => api.post('/user_profiles', {}),
  getUserProfile: ({ token }: { token?: string }) =>
    api.get<UserAttributes>('/user_profiles/info', { headers: { Authorization: `Bearer ${token}` } }),
  getCanvasByUser: () =>
    api.get<
      {
        canva_id: number;
        comments: Comment[];
        image_url: string;
        likes: string;
      }[]
    >('/user_profiles/canvas'),
};

export const apiNft = {
  postNftTransfers: (token_id: string, to_address: string, from_address: string, transactionId: string) =>
    api.post('/nft_transfers', {
      nft_transfer: {
        token_id,
        to_address,
        from_address,
        transaction_hash: transactionId,
      },
    }),
};
