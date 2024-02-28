import {
  ArrowBack as ArrowBackIcon,
  FavoriteBorder as FavoriteBorderComponent,
  ChatBubble as ChatBubbleComponent,
  ChatBubbleOutline as ChatBubbleOutlineComponent,
} from '@mui/icons-material';
import { Avatar, Grid, Paper as PaperComponent, css, styled } from '@mui/material';

import theme from '@styles/theme';

const IconCommonStyle = css`
  stroke: ${theme.palette.common.black};
  fill: ${theme.palette.common.black};
  stroke-width: 0.1px;
`;
export const ArrowBack = styled(ArrowBackIcon)(IconCommonStyle);
export const Paper = styled(PaperComponent)({
  borderRadius: 30,
  width: '80%',
  height: '100%',
  margin: 'auto',
  maxWidth: '1500px',
});
export const Canva = styled(Grid)<{ image: string }>(({ image }) => ({
  backgroundImage: `url(${image})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}));
export const CommentsContainer = styled(Grid)(({ theme: themeProp }) => ({
  border: `2px solid ${themeProp.customPalette.blackTransparent.main}`,
  borderRadius: 10,
  padding: 10,
  flexDirection: 'column',
  overflow: 'scroll',
  flexWrap: 'nowrap',
  gap: '1rem',
}));
export const FavoriteBorder = styled(FavoriteBorderComponent)(IconCommonStyle);
export const ChatBubble = styled(ChatBubbleComponent)(IconCommonStyle);
export const ChatBubbleOutline = styled(ChatBubbleOutlineComponent)(IconCommonStyle);
export const Container = styled(Grid)({
  padding: '1rem',
  flexDirection: 'column',
  paddingBottom: '2rem',
});
export const SubContainer = styled(Grid)({
  flexDirection: 'column',
  gap: '1rem',
  alignSelf: 'center',
  height: '100%',
  padding: '1rem',
});
export const TitleContainer = styled(Grid)({
  padding: '1rem',
  paddingTop: '0',
  paddingBottom: '0.5rem',
  alignItems: 'center',
  gap: '1rem',
});
export const ProfilePicture = styled(Avatar)({ width: '3rem', height: '3rem' });
export const BoxContainer = styled(Grid)({ alignItems: 'center', justifyContent: 'center', gap: '2rem' });
export const RigthContainer = styled(Grid)({ flexDirection: 'column', gap: '1rem', height: '100%' });
export const CommentContainer = styled(Grid)({
  alignItems: 'center',
  gap: '1rem',
  paddingLeft: '0.5rem',
  paddingTop: '0.5rem',
});
export const CommentProfile = styled(Avatar)({ width: '2.5rem', height: '2.5rem' });
export const ButtonContainer = styled(Grid)({ alignItems: 'flex-start', gap: '1rem' });
export const LikeContainer = styled('div')({ display: 'flex', alignItems: 'center', flexDirection: 'column' });
export const InputContainer = styled(Grid)({ alignItems: 'center', gap: '1rem' });
