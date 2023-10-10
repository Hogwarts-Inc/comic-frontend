/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Provider as ScenifyProvider } from '@layerhub-io/react';
import { TimerProvider } from '@layerhub-io/use-timer';
import { ThemeProvider } from '@mui/material';
import { BaseProvider, LightTheme } from 'baseui';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvier } from 'react-redux';

import { AppProvider } from './contexts/AppContext';
import { DesignEditorProvider } from './contexts/DesignEditor';
import { store } from './store/store';
import theme from '../src/styles/theme';
import './translations';

const Provider = ({ children }: { children: React.ReactNode }) => (
  <ReduxProvier store={store}>
    <ThemeProvider theme={theme}>
      <DesignEditorProvider>
        <TimerProvider>
          <AppProvider>
            <ScenifyProvider>
              <BaseProvider theme={LightTheme}>
                <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
              </BaseProvider>
            </ScenifyProvider>
          </AppProvider>
        </TimerProvider>
      </DesignEditorProvider>
    </ThemeProvider>
  </ReduxProvier>
);
export default Provider;
