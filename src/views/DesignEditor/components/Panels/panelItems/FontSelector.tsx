/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';

import { useEditor } from '@layerhub-io/react';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Delete } from 'baseui/icon';
import { Input, SIZE } from 'baseui/input';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';

import useIsMobile from 'src/hooks/useIsMobile';
import { IFontFamily } from 'src/interfaces/editor';

import Search from '../../../../../components/Icons/Search';
import InfiniteScrolling from '../../../../../components/InfiniteScrolling';
import Scrollable from '../../../../../components/Scrollable';
import useAppContext from '../../../../../hooks/useAppContext';
import { queryFonts } from '../../../../../store/slices/fonts/actions';
import { selectFonts } from '../../../../../store/slices/fonts/selectors';
import { useAppDispatch } from '../../../../../store/store';
import { loadFonts } from '../../../../../utils/fonts';

export default function FontSelector() {
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');
  const { setActiveSubMenu } = useAppContext();
  const fonts = useSelector(selectFonts);
  const [commonFonts, setCommonFonts] = useState<IFontFamily[]>([]);
  const [searchQuery] = useDebounce(query, 250);
  const [css] = useStyletron();
  const editor = useEditor();
  const dispath = useAppDispatch();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const grouped = groupBy(fonts, 'family');
    const standardFonts = Object.keys(grouped).map(key => {
      const familyFonts = grouped[key];
      const standardFont = familyFonts.find(familyFont => familyFont.postScriptName.includes('-Regular'));
      if (standardFont) {
        return standardFont;
      }
      return familyFonts[familyFonts.length - 1];
    });
    setCommonFonts(standardFonts);
  }, [fonts]);

  const handleFontFamilyChange = async (x: any) => {
    if (editor) {
      const font = {
        name: x.postScriptName,
        url: x.url,
      };
      await loadFonts([font]);

      editor.objects.update({
        fontFamily: x.postScriptName,
        fontURL: font.url,
      });
    }
  };

  useEffect(() => {
    dispath(
      queryFonts({
        query: searchQuery,
        skip: pageNumber,
        take: 100,
      }),
    );
    setHasMore(false);
    if (!searchQuery) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [dispath, pageNumber, searchQuery]);

  const fetchData = useCallback(() => {
    if (!searchQuery) {
      dispath(
        queryFonts({
          query: searchQuery,
          skip: pageNumber,
          take: 100,
        }),
      );
    }

    setPageNumber(pageNumber + 1);
  }, [dispath, pageNumber, searchQuery]);

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
        <Block>{t('editor.selectAFont')}</Block>

        <Block onClick={() => setActiveSubMenu('')} $style={{ cursor: 'pointer', display: 'flex' }}>
          <Delete size={24} />
        </Block>
      </Block>

      <Block $style={{ padding: '0 1.5rem 1rem' }}>
        <Input
          overrides={{
            Root: {
              style: {
                paddingLeft: '8px',
              },
            },
          }}
          clearable
          onChange={e => setQuery((e.target as any).value)}
          placeholder={t('editor.searchFont')}
          size={SIZE.compact}
          startEnhancer={<Search size={16} />}
        />
      </Block>

      <Scrollable>
        <Block $style={{ padding: isMobile ? '0 1.5rem 1rem 1.5rem' : '0 1.5rem', display: 'grid', gap: '0.2rem' }}>
          <InfiniteScrolling fetchData={fetchData} hasMore={hasMore}>
            <Block $style={{ display: 'grid' }}>
              {commonFonts.map(font => (
                <div
                  key={font.id}
                  onClick={() => handleFontFamilyChange(font)}
                  className={css({
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '14px',
                    ':hover': {
                      backgroundColor: 'rgb(245,246,247)',
                    },
                  })}
                  id={font.id}>
                  <img src={font.preview} />
                </div>
              ))}
            </Block>
          </InfiniteScrolling>
        </Block>
      </Scrollable>
    </Block>
  );
}
