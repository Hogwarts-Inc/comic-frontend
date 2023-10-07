import axios from "axios";

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

//CANVAS
const apis = {
  getCanva: () => api.get("/canvas"),
};


export default apis;