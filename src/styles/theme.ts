import { createTheme } from '@mui/material/styles';
// allow configuration using `createTheme`
declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {}
  // allow configuration using `createTheme`
  interface ThemeOptions extends CustomTheme {}
}

interface CustomTheme {
  customPalette: {
    third: { main: string };
    violet: { main: string };
    violetDark: { main: string };
    blackTransparent: { main: string };
    gradient: { main: string };
    gradientReverse: { main: string };
    gradientBox: { main: string };
  };
}

const theme = createTheme({
  // Colores
  palette: {
    primary: {
      main: '#40E0D0',
    },
    secondary: {
      main: '#FF4081',
    },
    background: {
      default: '#DADADA',
    },
    text: {
      primary: '#1E0E62',
      secondary: '#000',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
  },
  customPalette: {
    third: {
      main: '#7079BE',
    },
    violet: {
      main: 'rgba(112, 121, 190, 0.55)',
    },
    violetDark: {
      main: 'rgba(112, 121, 190, 0.8)',
    },
    blackTransparent: {
      main: 'rgba(0, 0, 0, 0.25)',
    },
    gradient: {
      main: 'linear-gradient(to right, rgba(64, 224, 208, 1), rgba(112, 121, 190, 1), rgba(255, 0, 128, 1))',
    },
    gradientReverse: {
      main: 'linear-gradient(to left, rgba(64, 224, 208, 1), rgba(112, 121, 190, 1), rgba(255, 0, 128, 1))',
    },
    gradientBox: {
      main: 'linear-gradient(to bottom, rgba(64, 224, 208, 1) 0%, rgba(112, 121, 190, 1) 62%, rgba(255, 0, 128, 1) 100%)',
    },
  },
  breakpoints: {
    values: {
      xs: 0, // Mobile
      sm: 600, // Tablet and larger
      md: 960, // Desktop
      lg: 1280, // Large desktop
      xl: 1920, // Extra-large desktop
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: '0 auto',
        },
        h1: {
          fontSize: '0.925rem',
          fontWeight: '600',
          lineHeight: '1.5rem',
          letterSpacing: '0.009rem',
        },
        h2: {
          fontSize: '1.2rem',
          fontWeight: '700',
          lineHeight: '1.125rem',
        },
        h3: {
          fontSize: '1.125rem',
          fontWeight: '600',
          lineHeight: '1.5rem',
          letterSpacing: '0.009rem',
        },
      },
    },
  },
});
export default theme;
