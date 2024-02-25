/* eslint-disable indent */
import { Grid, styled } from '@mui/material';

export const ButtonText = styled('p')({
  fontSize: '0.7rem',
  margin: 0,
});

export const ButtonsContainer = styled(Grid)(() => ({
  height: 'fit-content',
  width: 'auto',
  overflow: 'scroll',
  gap: '1rem',
  padding: '1rem',
}));

export const ButtonContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

export const Container = styled(Grid, {
  shouldForwardProp: props => !['isMobile'].includes(props as string),
})<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  gap: '1rem',
  height: '100%',
  ...(isMobile
    ? {
        background: `linear-gradient(89.97deg, ${theme.palette.secondary.main} 44.58%,
           ${theme.customPalette.third.main} 63.56%, ${theme.palette.primary.main} 95%)`,
      }
    : {
        background: `linear-gradient(181deg, ${theme.palette.secondary.main} 0.23%, 
            ${theme.customPalette.third.main} 14.06%, ${theme.palette.primary.main} 36.98%)`,
        padding: '1.25rem 0 0 1.25rem',
      }),
}));

export const WhiteContainer = styled(Grid, {
  shouldForwardProp: props => !['isMobile'].includes(props as string),
})<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  background: theme.palette.common.white,
  borderTopLeftRadius: '1.875rem',
  justifyContent: 'center',
  alignItems: 'center',
  ...(isMobile
    ? {
        borderBottom: `1px solid ${theme.customPalette.shadow.third} `,
      }
    : {
        overflow: 'scroll',
      }),
}));

export const SubContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flex: 'none',
});
