/* eslint-disable indent */
import { styled } from '@mui/material';
import { Block } from 'baseui/block';

export const EditorPanelItem = styled(Block)<{ isMobile: boolean; isSidebarOpen: boolean }>(
  ({ isMobile, isSidebarOpen }) => ({
    background: '#ffffff',
    flex: 'none',
    display: 'flex',
    overflow: 'hidden',
    ...(isMobile && isSidebarOpen
      ? {
          position: 'absolute',
          height: isSidebarOpen ? '40%' : 0,
          width: '100%',
          zIndex: 1,
          transition: 'ease heigth 0.1s',
          border: '1px solid #d7d8e3',
        }
      : { transition: 'ease width 0.1s', width: isSidebarOpen ? '306px' : 0, borderRight: '1px solid #d7d8e3' }),
  }),
);
