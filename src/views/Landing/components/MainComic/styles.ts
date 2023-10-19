import { Grid, styled } from '@mui/material';

interface StyledProps {
    lg?: boolean;
}

export const Title = styled('p')<StyledProps>(({ theme, lg }) => ({
    color: theme.palette.text.primary,
    fontSize: lg ? '58px' : '25px',
    fontWeight: 700,
    letterSpacing: '-1px',
    lineHeight: lg ? '70px' : '20px',
    textAlign: 'center',
}));

export const MainComicGrid = styled(Grid)(({ }) => ({
    justifyContent: 'center',
}));