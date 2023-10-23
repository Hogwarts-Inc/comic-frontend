import { Grid, styled } from '@mui/material';

export const Title = styled('p')(({ theme }) => ({
  textAlign: 'center',
  fontStyle: 'normal',
  fontWeight: 700,
  letterSpacing: '-1px',
  color: theme.palette.text.primary,
  fontSize: '25px',
  lineHeight: '20px',

  [theme.breakpoints.up('lg')]: {
    fontSize: '58px',
    lineHeight: '70px',
  },
}));

export const MainComicGrid = styled(Grid)(() => ({
  justifyContent: 'center',
}));
