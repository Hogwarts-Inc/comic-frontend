import { styled, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export const DialogStyle = styled(Dialog)({
  minWidth: '40vw',
  margin: 'auto',
  padding: '3rem',
});

export const DialogTitleStyle = styled(DialogTitle)({ textAlign: 'center', fontSize: '1.8rem' });

export const DialogContainer = styled('div')({ padding: '1rem' });

export const DialogContentStyle = styled(DialogContent)({ padding: '1rem' });

export const DialogActionsStyle = styled(DialogActions)({ justifyContent: 'space-around', paddingTop: '1.8rem' });
