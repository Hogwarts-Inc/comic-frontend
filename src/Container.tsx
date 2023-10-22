/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';

import ResizeObserver from 'resize-observer-polyfill';

import useAppContext from './hooks/useAppContext';
import { apisCharacter, apisGraphicResources } from './services/apiConfig';

function Container({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, setIsMobile } = useAppContext();
  const updateMediaQuery = (value: number) => {
    if (!isMobile && value >= 800) {
      setIsMobile(false);
    } else if (!isMobile && value < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    const containerElement = containerRef.current!;
    const containerWidth = containerElement.clientWidth;
    updateMediaQuery(containerWidth);
    const resizeObserver = new ResizeObserver(entries => {
      const { width = containerWidth } = (entries[0] && entries[0].contentRect) || {};
      updateMediaQuery(width);
    });
    resizeObserver.observe(containerElement);
    return () => {
      if (containerElement) {
        resizeObserver.unobserve(containerElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    apisGraphicResources.getGraphicResources();
    apisCharacter.getCharacters();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        display: 'flex',
        height: '100vh',
        width: '100vw',
      }}>
      {children}
    </div>
  );
}

export default Container;
