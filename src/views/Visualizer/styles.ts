import {
  ArrowBack as ArrowBackIcon,
  FavoriteBorder as FavoriteBorderComponent,
  ChatBubble as ChatBubbleComponent,
  ChatBubbleOutline as ChatBubbleOutlineComponent,
} from '@mui/icons-material';
import { Grid, Paper as PaperComponent, css, styled } from '@mui/material';

import theme from '@styles/theme';

const IconCommonStyle = css`
  stroke: ${theme.palette.common.black};
  fill: ${theme.palette.common.black};
  stroke-width: 0.1px;
`;
export const ArrowBack = styled(ArrowBackIcon)(IconCommonStyle);
export const Paper = styled(PaperComponent)({ padding: '1rem', borderRadius: 30, width: '60%' });
export const Canva = styled(Grid)<{ image: string }>(({ image }) => ({
  backgroundImage: `url(${image})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  height: '100%',
}));
export const CommentsContainer = styled(Grid)(({ theme: themeProp }) => ({
  border: `2px solid ${themeProp.customPalette.blackTransparent.main}`,
  borderRadius: 10,
  padding: 10,
}));
export const FavoriteBorder = styled(FavoriteBorderComponent)(IconCommonStyle);
export const ChatBubble = styled(ChatBubbleComponent)(IconCommonStyle);
export const ChatBubbleOutline = styled(ChatBubbleOutlineComponent)(IconCommonStyle);
