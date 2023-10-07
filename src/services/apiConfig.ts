import axios from "axios";


//TO DO: Add types
// type Canva = any;
type canvaCreation = any;
type canvaParam = any;
type storiettesCreation = any;
type storiettesParam = any;
type chapterCreation = any;
type chapterParam = any;
type graphicResourcesCreation = any;
type graphicResourcesParam = any;

export const CONTENT_TYPE = {
  // Accept: '/',
  'Content-Type': 'application/json',
};

const api = axios.create({
  baseURL: "http://164.152.19.10:3000/api/v1",
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
  getStoriettes: () => api.get("/storiettes"),
  getStoriettesById: (id:number) => api.get(`/storiettes/${id}`),
  postStoriettes: (data:storiettesCreation) => api.post("/storiettes",data),
  patchStoriettes: (id:number,data:storiettesParam) => api.patch(`/storiettes/${id}`,data),
};

//CHAPTERS
export const apisChapters = {
  getCChapters: () => api.get("/chapters"),
  getChaptersById: (id:number) => api.get(`/chapters/${id}`),
  postChapters: (data:chapterCreation) => api.post("/chapters",data),
  patchChapters: (id:number,data:chapterParam) => api.patch(`/chapters/${id}`,data),
};

//CANVAS
export const apisCanvas = {
  getCanva: () => api.get("/canvas"),
  getCanvaById: (id:number) => api.get(`/canvas/${id}`),
  postCanva: (data:canvaCreation) => api.post("/canvas",data),
  patchCanva: (id:number,data:canvaParam) => api.patch(`/canvas/${id}`,data),
};

//GRAPHIC RESOURCES
export const apisGraphicResources = {
  getGraphicResources: () => api.get("/graphic_resources"),
  getGraphicResourcesById: (id:number) => api.get(`/graphic_resources/${id}`),
  getGraphicResourcesByType: (type:string) => api.get(`/graphic_resources/resource_for_type?resource_type=${type}`),
  postGraphicResources: (data:graphicResourcesCreation) => api.post("/graphic_resources",data),
  patchGraphicResources: (id:number,data:graphicResourcesParam) => api.patch(`/graphic_resources/${id}`,data),
};
