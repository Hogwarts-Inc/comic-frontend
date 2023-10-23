import React from 'react';

import { useEditor } from '@layerhub-io/react';
import { ILayer } from '@layerhub-io/types';
import { Block } from 'baseui/block';
import { Button, SIZE } from 'baseui/button';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

import { CloseSideBar } from './Common/CloseSideBar';
import DropZone from '../../../../../components/Dropzone';
import Scrollable from '../../../../../components/Scrollable';
import { toBase64 } from '../../../../../utils/data';
import { captureFrame, loadVideoResource } from '../../../../../utils/video';

export default function Uploads() {
  const { t } = useTranslation();
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [uploads, setUploads] = React.useState<
    {
      id: string;
      src: string;
      preview: string;
      type: string;
    }[]
  >([]);
  const editor = useEditor();

  const handleDropFiles = async (files: FileList) => {
    const file = files[0];

    const isVideo = file.type.includes('video');
    const base64 = (await toBase64(file)) as string;
    let preview = base64;
    if (isVideo) {
      const video = await loadVideoResource(base64);
      const frame = await captureFrame(video);
      preview = frame;
    }

    const type = isVideo ? 'StaticVideo' : 'StaticImage';

    const upload = {
      id: nanoid(),
      src: base64,
      preview: preview,
      type: type,
    };

    setUploads([...uploads, upload]);
  };

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!);
  };

  const addImageToCanvas = (props: Partial<ILayer>) => {
    editor.objects.add(props);
  };
  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <Block $style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Block
          $style={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 500,
            justifyContent: 'space-between',
            padding: '1.5rem',
          }}>
          <Block>{t('uploads.title')}</Block>

          <CloseSideBar />
        </Block>
        <Scrollable>
          <Block padding="0 1.5rem">
            <Button
              onClick={handleInputFileRefClick}
              size={SIZE.compact}
              overrides={{
                Root: {
                  style: {
                    width: '100%',
                  },
                },
              }}>
              {t('uploads.upload')}
            </Button>
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: 'none' }} />

            <div
              style={{
                marginTop: '1rem',
                display: 'grid',
                gap: '0.5rem',
                gridTemplateColumns: '1fr 1fr',
              }}>
              {uploads.map(upload => (
                <div
                  key={upload.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => addImageToCanvas(upload)}>
                  <div>
                    <img width="100%" src={upload.preview ? upload.preview : upload.src} alt="preview" />
                  </div>
                </div>
              ))}
            </div>
          </Block>
        </Scrollable>
      </Block>
    </DropZone>
  );
}
