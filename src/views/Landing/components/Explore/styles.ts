import { Typography, styled } from '@mui/material';
import theme from '@styles/theme';

export const Box = styled('div')({
  border: '3px solid transparent',
  borderImage: theme.customPalette.gradientBox.main,
  borderImageSlice: 1,
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '420px',
  width: '100%',

  margin: '0 auto', // This centers the box and maintains equal margins on the sides

  [theme.breakpoints.down('sm')]: {
    margin: '0 20px', // Fixed distance from the edges on small screens
    height: '220px',
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    margin: '0 40px', // Fixed distance from the edges on medium screens
  },
  [theme.breakpoints.up('lg')]: {
    margin: '0 60px', // Fixed distance from the edges on large screens
  },
});

export const Content = styled('div')(({ theme }) => ({
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  textAlign: 'center',
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  lineHeight: 1.2,
  textAlign: 'center',
  padding: '0 1rem',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '1rem',
    fontSize: '18px',
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    marginBottom: '2rem',
    fontSize: '35px',
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: '3rem',
    fontSize: '42px',
  },
}));
