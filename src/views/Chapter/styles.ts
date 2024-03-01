import { Grid, Typography, styled } from '@mui/material';
import Button from '@components/Button';

export const Title = styled(Typography)(({ theme }) => ({
  margin: '0',
  color: theme.palette.text.primary,
}));

export const Container = styled(Grid)(({ theme }) => ({
  alignSelf: 'center',
  flexDirection: 'column',
  margin: '1rem 0',
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '90%',
  },
}));

export const TitleContainer = styled('div')({
  border: '0.15rem solid',
  borderImage: 'linear-gradient(to right, rgb(64, 224, 208), rgb(112, 121, 190), rgb(255, 0, 128)) 1',
  marginBottom: '2rem',
  padding: '1rem',
});

export const Loading = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const Img = styled('img')({
  width: '100%',
  height: 'auto',
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

export const AddCanvaButtonStyle = styled(Button, {
  shouldForwardProp: props => !['isFooterVisible'].includes(props as string),
})<{ isFooterVisible: boolean }>(({ isFooterVisible }) => ({
  position: 'absolute',
  bottom: isFooterVisible ? '4.5rem' : '1rem',
  boxShadow: 'none',
  right: '1rem',
}));
