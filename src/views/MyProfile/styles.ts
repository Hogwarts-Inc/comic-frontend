import { Avatar, Grid, Typography, styled } from '@mui/material';

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const Name = styled(Typography)(({ theme }) => ({
  margin: '0 0 0 2rem',
  color: theme.palette.text.primary,
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const Container = styled(Grid)({
  width: '90%',
  flexDirection: 'column',
  alignSelf: 'center',
});

export const ProfileInfoWrapp = styled(Grid)({
  marginBottom: '3rem',
});

export const UserInfo = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const AvatarStyles = styled(Avatar)({ width: '8vw', height: '8vw' });

export const GridUserCanva = styled(Grid)({ display: 'flex', justifyContent: 'flex-start' });

export const ImageCanva = styled('img')({ width: '99%', height: 'auto', '&:hover': { cursor: 'pointer' } });
