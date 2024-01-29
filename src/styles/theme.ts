import { createTheme } from '@mui/material/styles';
// allow configuration using `createTheme`
declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {}
  // allow configuration using `createTheme`
  interface ThemeOptions extends CustomTheme {}
}

interface CustomTheme {
  customPalette: {
    like: { main: string };
    third: { main: string };
    violet: { main: string };
    violetDark: { main: string };
    blackTransparent: { main: string; secondary: string };
    gradient: { main: string };
    gradientReverse: { main: string };
    gradientBox: { main: string };
    shadow: { main: string; secondary: string; third: string };
    ligth: { main: string };
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
    like: { main: 'red' },
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
      secondary: 'rgba(0,0,0,0.1)',
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
    shadow: {
      main: 'rgba(64,87,109,0.07)',
      secondary: 'rgba(53,71,90,0.2)',
      third: 'rgb(0 0 0 / 15%)',
    },
    ligth: {
      main: 'rgb(243,244,246)',
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
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 10 } } },
    MuiIconButton: { styleOverrides: { sizeLarge: { fontSize: '40px', padding: 4 } } },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '.MuiStepIcon-root': {
            color: 'lightgray',
          },
          '&.Mui-completed': {
            color: '#1E0E62',
            '& text': {
              fill: 'white',
            },
          },
          '&.Mui-active': {
            color: '#1E0E62',
            '& text': {
              fill: 'white',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          maxHeight: '50px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '4rem', //64px
          fontWeight: '700',
          lineHeight: '2rem',
        },
        h2: {
          fontSize: '3.625rem', //58px
          fontWeight: '700',
          lineHeight: '4.375rem',
        },
        h3: {
          fontSize: '2.625rem', //42px
          fontWeight: '700',
          lineHeight: '3.25rem',
        },
        h4: {
          fontSize: '1.5rem', //24px
          fontWeight: '500',
          lineHeight: '2.125rem',
        },
      },
    },
  },
});
export default theme;
