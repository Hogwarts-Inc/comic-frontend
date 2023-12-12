import { Grid, Typography, styled } from '@mui/material';

export const Title = styled(Typography)(({ theme }) => ({
  // margin: '0 0 0 1rem',
  color: theme.palette.text.primary,
}));

export const Name = styled(Typography)(({ theme }) => ({
  margin: '0 0 0 2rem',
  color: theme.palette.text.primary,
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const Container = styled('div')({
  margin: '2rem',
});

export const ProfileInfoWrapp = styled(Grid)({
  marginBottom: '3rem',
});
