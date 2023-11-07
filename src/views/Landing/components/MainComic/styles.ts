import { Grid, styled } from '@mui/material';

export const Title = styled('p')(({ theme }) => ({
  textAlign: 'center',
  fontStyle: 'normal',
  fontWeight: 700,
  letterSpacing: '-1px',
  color: theme.palette.text.primary,
  lineHeight: '20px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '25px',
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    fontSize: '35px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '58px',
    lineHeight: '70px',
  },
}));

export const MainComicGrid = styled(Grid)(() => ({
  justifyContent: 'center',
}));
