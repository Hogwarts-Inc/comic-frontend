import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid, Typography, styled } from '@mui/material';

export const Title = styled(Typography)(({ theme }) => ({
  margin: '0',
  color: theme.palette.text.primary,
}));

export const Container = styled(Grid)({
  alignSelf: 'center',
  flexDirection: 'column',
  margin: '2rem 0',
  width: '80%',
});

export const Loading = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

export const Img = styled('img')({
  width: '100%',
  height: 'auto',
  marginRight: '10px',
  '&:hover': {
    cursor: 'pointer',
  },
  boxShadow:
    'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
});

export const ImgWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const AddCanvaButton = styled(Button)({
  position: 'absolute',
  bottom: 10,
  right: 18,
  borderRadius: '50%',
  boxShadow: 'none',
  maxWidth: '68px',
  minWidth: '68px',
});

export const AddCircleOutlineStyle = styled(AddCircleOutline)({ fontSize: 68, color: 'black' });
