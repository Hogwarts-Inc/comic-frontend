/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const PEXELS_KEY = process.env.VITE_APP_PEXELS_KEY;
const pexelsClient = axios.create({
  baseURL: 'https://api.pexels.com',
  headers: {
    Authorization: PEXELS_KEY,
  },
});

export const getPexelsVideos = (query: string) =>
  new Promise((resolve, reject) => {
    pexelsClient
      .get(`/videos/search?query=${query}&per_page=20&size=small`)
      .then(({ data }) => {
        const videos = data.videos.map((video: any) => ({
          id: video.id,
          type: 'StaticVideo',
          src: video.video_files[0].link,
          preview: video.image,
          duration: 1,
        }));
        resolve(videos);
      })
      .catch(err => {
        reject(err);
      });
  });
