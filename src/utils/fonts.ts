/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IScene, ILayer, IStaticText } from '@layerhub-io/types';

import { FontItem } from '../interfaces/common';

const getFontsFromObjects = (objects: Partial<ILayer>[]) => {
  let fonts: { name: string; url: string }[] = [];
  for (const object of objects) {
    if (object.type === 'StaticText' || object.type === 'DynamicText') {
      fonts.push({
        name: (object as Required<IStaticText>).fontFamily,
        url: (object as Required<IStaticText>).fontURL,
      });
    }
    if (object.type === 'Group') {
      // @ts-ignore
      const groupFonts = getFontsFromObjects(object.objects);

      fonts = fonts.concat(groupFonts);
    }
  }
  return fonts;
};

export const loadFonts = (fonts: FontItem[]) => {
  const promisesList = fonts.map(font => new FontFace(font.name, `url(${font.url})`).load().catch(err => err));
  return new Promise((resolve, reject) => {
    Promise.all(promisesList)
      .then(res => {
        res.forEach(uniqueFont => {
          if (uniqueFont && uniqueFont.family) {
            document.fonts.add(uniqueFont);
            resolve(true);
          }
        });
      })
      .catch(err => reject(err));
  });
};

export const loadTemplateFonts = async (design: IScene) => {
  const fonts = getFontsFromObjects(design.layers);
  if (fonts.length > 0) {
    await loadFonts(fonts);
  }
};
