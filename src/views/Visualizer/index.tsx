/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useMemo, useState } from 'react';

import { Favorite } from '@mui/icons-material';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';

import Button from '@components/Button';
import DefaultLayout from '@components/DefaultLayout';
import theme from '@styles/theme';
import useAppAuthentication from 'src/hooks/useAppAuthentication';
import useIsMobile from 'src/hooks/useIsMobile';
import { apisCanvasComment, apisCanvasLike } from 'src/services/apiConfig';

import {
  ArrowBack,
  BoxContainer,
  ButtonContainer,
  Canva,
  ChatBubble,
  ChatBubbleOutline,
  CommentContainer,
  CommentProfile,
  CommentsContainer,
  Container,
  FavoriteBorder,
  InputContainer,
  LikeContainer,
  Paper,
  ProfilePicture,
  RigthContainer,
  SubContainer,
  TitleContainer,
} from './styles';

export type VisualizerProps = {
  image: string;
  username: string;
  profilePicture: string;
  comments: { id: string; username: string; comment: string; profilePicture: string }[];
  likes: number;
  currentUserLikes: boolean;
  accessToken: string;
  currentUserUsername: string;
  currentUserProfilePicture: string;
};
export default function Visualizer(props: VisualizerProps) {
  useAppAuthentication(props.accessToken);
  const { back, asPath, query } = useRouter();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const [currentUserLikes, setCurrentUserLikes] = useState(props.currentUserLikes);
  const [showInput, setShowInput] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(props.comments);

  const handleLike = useCallback(
    debounce(
      async (like: boolean, currentLikesCount: number, currentUserHasLiked: boolean) => {
        if (query.vignette) {
          const prevCurrentUserLikes = currentUserHasLiked;
          const prevLikes = currentLikesCount;
          setCurrentUserLikes(like);
          setLikes(prevValue => prevValue + (like ? 1 : -1));
          try {
            if (like) {
              await apisCanvasLike.postCanvasLike(+query.vignette);
            } else {
              await apisCanvasLike.deleteCanvasLike(+query.vignette);
            }
          } catch (e) {
            setCurrentUserLikes(prevCurrentUserLikes);
            setLikes(prevLikes);
          }
        }
      },
      500,
      { leading: true, trailing: false },
    ),
    [query],
  );

  const url = useMemo(() => `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`, [asPath]);

  const commentHandler = async () => {
    if (query.vignette) {
      const prevComment = comment;
      const prevComments = comments;
      try {
        setComment('');
        setComments(prevValue => [
          ...prevValue,
          {
            username: props.currentUserUsername,
            comment: prevComment,
            profilePicture: props.currentUserProfilePicture,
            id: Math.random().toString(),
          },
        ]);
        await apisCanvasComment.postCanvasComment(+query.vignette, prevComment);
      } catch (e) {
        setComment(prevComment);
        setComments(prevComments);
      }
    }
  };

  return (
    <DefaultLayout>
      <Container container item>
        <Grid item>
          <IconButton size="large" onClick={back}>
            <ArrowBack fontSize="inherit" />
          </IconButton>
        </Grid>
        <Grid container item xs justifyContent="center">
          <Paper elevation={3}>
            <SubContainer container xs>
              <TitleContainer container item>
                <ProfilePicture src={props.profilePicture} />
                <Typography variant="h4" margin={0}>
                  {props.username}
                </Typography>
              </TitleContainer>
              <BoxContainer container xs item direction={isMobile ? 'column' : 'row'}>
                <Canva container item xs image={props.image} />
                <RigthContainer container item xs>
                  <CommentsContainer container item xs>
                    {comments.length ? (
                      comments.map(({ username, comment: commentText, profilePicture }) => (
                        <CommentContainer container item>
                          <CommentProfile src={profilePicture} />
                          <Typography margin={0} variant="h6">
                            {username}
                          </Typography>
                          <Typography margin={0} variant="body2">
                            {commentText}
                          </Typography>
                        </CommentContainer>
                      ))
                    ) : (
                      <Typography margin="auto" variant="h6">
                        {t('canva.noComments')}
                      </Typography>
                    )}
                  </CommentsContainer>
                  <ButtonContainer container item>
                    {!!props.accessToken && (
                      <LikeContainer>
                        <IconButton size="large" onClick={() => handleLike(!currentUserLikes, likes, currentUserLikes)}>
                          {currentUserLikes ? (
                            <Favorite fontSize="inherit" sx={{ color: theme.customPalette.like.main }} />
                          ) : (
                            <FavoriteBorder fontSize="inherit" />
                          )}
                        </IconButton>
                        <Typography variant="subtitle2" margin={0}>
                          {likes}
                        </Typography>
                      </LikeContainer>
                    )}
                    {!!props.accessToken && (
                      <IconButton size="large">
                        {showInput ? (
                          <ChatBubble fontSize="inherit" onClick={() => setShowInput(!showInput)} />
                        ) : (
                          <ChatBubbleOutline fontSize="inherit" onClick={() => setShowInput(!showInput)} />
                        )}
                      </IconButton>
                    )}
                    <FacebookShareButton url={url} style={{ margin: '4px' }}>
                      <FacebookIcon size={40} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={url} style={{ margin: '4px' }}>
                      <XIcon size={40} round />
                    </TwitterShareButton>
                    <WhatsappShareButton url={url} style={{ margin: '4px' }}>
                      <WhatsappIcon size={40} round />
                    </WhatsappShareButton>
                  </ButtonContainer>
                  {showInput && (
                    <InputContainer container item>
                      <Grid item xs>
                        <TextField
                          variant="outlined"
                          fullWidth
                          size="small"
                          multiline
                          maxRows={3}
                          style={{ borderRadius: 30 }}
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        />
                      </Grid>
                      <Button variant="contained" sx={{ marginBottom: 0.5 }} onClick={commentHandler}>
                        {t('common.send')}
                      </Button>
                    </InputContainer>
                  )}
                </RigthContainer>
              </BoxContainer>
            </SubContainer>
          </Paper>
        </Grid>
      </Container>
    </DefaultLayout>
  );
}
