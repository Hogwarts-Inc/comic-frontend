/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';

import { useEditor } from '@layerhub-io/react';
import { IStaticImage } from '@layerhub-io/types';
import { Block } from 'baseui/block';
import { Input } from 'baseui/input';
import { SIZE, Spinner } from 'baseui/spinner';

import { CloseSideBar } from './Common/CloseSideBar';
import Search from '../../../../../components/Icons/Search';
import InfiniteScrolling from '../../../../../components/InfiniteScrolling';
import LazyLoadImage from '../../../../../components/LazyLoadImage';
import Scrollable from '../../../../../components/Scrollable';
import api from '../../../../../services/api';

const Pixabay = () => {
  const editor = useEditor();
  const [hasMore, setHasMore] = React.useState(true);
  const [images, setImages] = useState<IStaticImage[]>([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [isloading, setIsloading] = React.useState(true);
  const [category, setCategory] = useState<string>('');

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: 'StaticImage',
          src: url,
        };
        editor.objects.add(options);
      }
    },
    [editor],
  );

  const fetchData = React.useCallback(
    async (reset?: boolean) => {
      setIsloading(true);

      const newImages = await api.getPixabayImages({
        query: category || 'nature',
        perPage: 12,
        page: pageNumber,
      });

      if (newImages.length === 0) {
        setHasMore(false);
        setIsloading(false);
        return;
      }

      let all = [...images, ...newImages];
      // Set only new images if reset = true. It should be useful for new queries
      if (reset) {
        all = newImages;
      }
      // @ts-ignore
      setImages(all);
      setPageNumber(pageNumber + 1);
      setIsloading(false);
    },
    [pageNumber, hasMore, category, images],
  );

  const makeSearch = () => {
    setImages([]);
    setPageNumber(1);
    setIsloading(true);
    fetchData(true);
  };
  return (
    <Block flex={1} flexDirection="column" display={'flex'}>
      <Block
        $style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          justifyContent: 'space-between',
          padding: '1.5rem 1.5rem 0',
        }}>
        <Block>Pixabay images</Block>

        <CloseSideBar />
      </Block>

      <Block $style={{ padding: '1.5rem 1.5rem 1rem' }}>
        <Input
          overrides={{
            Root: {
              style: {
                paddingLeft: '8px',
              },
            },
          }}
          onKeyDown={key => key.code === 'Enter' && makeSearch()}
          onBlur={makeSearch}
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Search"
          size={'compact'}
          startEnhancer={<Search size={16} />}
        />
      </Block>
      <Scrollable>
        <Block padding={'0 1.5rem'}>
          <InfiniteScrolling fetchData={fetchData} hasMore={hasMore}>
            <Block
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
              }}>
              {images.map(image => (
                <Block
                  $style={{ cursor: 'pointer', borderRadius: '10px', overflow: 'hidden' }}
                  onClick={() => addObject(image.src)}
                  key={image.id}>
                  <LazyLoadImage url={image.src} />
                </Block>
              ))}
            </Block>
            <Block
              $style={{
                display: 'flex',
                justifyContent: 'center',
                paddingY: '2rem',
              }}>
              {isloading && <Spinner $size={SIZE.small} />}
            </Block>
          </InfiniteScrolling>
        </Block>
      </Scrollable>
    </Block>
  );
};

export default Pixabay;
