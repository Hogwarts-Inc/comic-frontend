/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useEditor } from '@layerhub-io/react';
import { Block } from 'baseui/block';

import { CloseSideBar } from './Common/CloseSideBar';
import Scrollable from '../../../../../components/Scrollable';
import useDesignEditorContext from '../../../../../hooks/useDesignEditorContext';
import { getPexelsVideos } from '../../../../../services/pexels';

const loadVideoResource = (videoSrc: string): Promise<HTMLVideoElement> =>
  new Promise(function (resolve, reject) {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.crossOrigin = 'anonymous';
    video.addEventListener('loadedmetadata', function () {
      video.currentTime = 1;
    });

    video.addEventListener('seeked', function () {
      resolve(video);
    });

    video.addEventListener('error', function (error) {
      reject(error);
    });
  });

const captureFrame = (video: HTMLVideoElement) =>
  new Promise(function (resolve) {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(video.src);

    const data = canvas.toDataURL();

    fetch(data)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      });
  });

const captureDuration = (video: HTMLVideoElement): Promise<number> =>
  new Promise(resolve => {
    resolve(video.duration);
  });

const Videos = () => {
  const editor = useEditor();
  const [videos, setVideos] = React.useState<any[]>([]);
  const { scenes, setScenes, currentScene } = useDesignEditorContext();

  const loadPexelsVideos = async () => {
    const videos = (await getPexelsVideos('people')) as any;
    setVideos(videos);
  };
  React.useEffect(() => {
    loadPexelsVideos();
  }, []);

  const addObject = React.useCallback(
    async (options: any) => {
      if (editor) {
        const video = await loadVideoResource(options.src);
        const frame = await captureFrame(video);
        const duration = await captureDuration(video);
        editor.objects.add({ ...options, duration, preview: frame });
        const updatedScenes = scenes.map(scn => {
          if (scn.id === currentScene?.id) {
            return {
              ...currentScene,
              duration: duration * 1000 > currentScene.duration! ? duration * 1000 : currentScene.duration!,
            };
          }
          return scn;
        });
        setScenes(updatedScenes);
      }
    },
    [editor, scenes, currentScene],
  );

  return (
    <Block $style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Block
        $style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          justifyContent: 'space-between',
          padding: '1.5rem',
        }}>
        <Block>Videos</Block>

        <CloseSideBar />
      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          <div style={{ display: 'grid', gap: '8px', gridTemplateColumns: '1fr 1fr' }}>
            {videos.map((video, index) => (
              <img width="120px" key={index} src={video.preview} onClick={() => addObject(video)} />
            ))}
          </div>
        </Block>
      </Scrollable>
    </Block>
  );
};

export default Videos;
