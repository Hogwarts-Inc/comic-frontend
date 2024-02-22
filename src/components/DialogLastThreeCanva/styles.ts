import { styled, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';

export const DialogStyle = styled(Dialog)({
  minWidth: '40vw',
  margin: 'auto',
  padding: '3rem',
});

export const DialogTitleStyle = styled(DialogTitle)({ textAlign: 'center', fontSize: '1.8rem' });

export const DialogContentTextStyle = styled(DialogContentText)({ textAlign: 'center' });

export const DialogContainer = styled('div')({ padding: '1rem', width: '600px' });

export const DialogContentStyle = styled(DialogContent)({ padding: '1rem' });

export const DialogActionsStyle = styled(DialogActions)({ justifyContent: 'space-around', paddingTop: '1.8rem' });

export const ThumbnailContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(5),
  marginBottom: '2rem',
  marginTop: '2rem',
  // width: '100%',
}));

export const Thumbnail = styled('img')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  height: '180px',
  objectFit: 'cover',
  width: '180px',
}));
