import { createTheme } from '@mui/material/styles';


const customColors = {
    third: '#7079BE', 
  };

const theme = createTheme({
    // Colores
    palette: {
      primary: {
        main: '#40E0D0', 
      },
      secondary: {
        main: '#FF4081', 
      },
      background:{
        default: '#DADADA',
      },
      text:{
        primary: '#1E0E62',
        secondary: '#000',
      },
      common:{
        black:'#000',
        white:'#fff',
      },
      ...customColors
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    margin: '0 auto'
                },
                h1: {
                    fontSize: '0.925rem', fontWeight: '600', lineHeight: '1.5rem', letterSpacing: '0.009rem'
                },
                h2: {
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    lineHeight: '1.125rem'
                },
                h3: {
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    lineHeight: '1.5rem',
                    letterSpacing: '0.009rem'
                },
            },
            variants: [{
                props: { className: 'title'},
                style: {
                    fontSize: '3.625rem',
                    textAlign: 'left',
                    fontWeight: 'bold'
                }
            },]
        },}
  });
  export default theme;
