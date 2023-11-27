import { Typography, styled } from '@mui/material';

export const Title = styled(Typography)(({ theme }) => ({
  margin: '0',
  color: theme.palette.text.primary,
}));

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '4rem 0',
});

export const Loading = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

export const Img = styled('img')({
  width: '80vw',
  height: 'auto',
  marginRight: '10px',
});

export const ImgWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
