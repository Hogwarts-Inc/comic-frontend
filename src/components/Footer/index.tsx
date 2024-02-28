/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import useOnScreen from 'src/hooks/useOnScreen';
import { TermsAndConditions, apisTermsAndConditions } from 'src/services/api';

import { BoxMui, TextButton, TypographyWhite, TypographyWhiteLink } from './styles';

export const Footer = ({ onFooterIsShowed }: { onFooterIsShowed?: (value: boolean) => void }) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const isVisible = useOnScreen(ref);
  useEffect(() => {
    onFooterIsShowed?.(isVisible);
  }, [isVisible, onFooterIsShowed]);
  const [termsAndConditions, setTermsAndConditions] = useState<TermsAndConditions | undefined>();

  useEffect(() => {
    apisTermsAndConditions.getTermsAndConditions().then(({ data }) => {
      setTermsAndConditions(data[0]);
    });
  }, []);

  return (
    <BoxMui ref={ref}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TypographyWhite>
          {t('footer.knowAboutArtesVisualesStart')}
          <TypographyWhiteLink
            href="https://carreras.ucu.edu.uy/programas/ver/licenciatura-en-artes-visuales--mvd--presencial?variante=2"
            target="_blank">
            {` ${t('footer.ArtesVisuales')} `}
          </TypographyWhiteLink>
          {t('footer.knowAboutArtesVisualesEnd')}
        </TypographyWhite>
      </div>
      <div style={{ display: 'flex' }}>
        <TypographyWhite>
          {t('footer.see')}
          <TypographyWhiteLink href={termsAndConditions?.file_url} target="_blank" rel="noreferrer">
            {t('footer.termsAndConditions')}
          </TypographyWhiteLink>
        </TypographyWhite>
      </div>
    </BoxMui>
  );
};
