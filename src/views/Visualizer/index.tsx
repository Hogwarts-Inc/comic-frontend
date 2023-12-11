/* eslint-disable react/destructuring-assignment */
import React, { useMemo, useState } from 'react';

import { Favorite } from '@mui/icons-material';
import { Avatar, Grid, IconButton, TextField, Typography } from '@mui/material';
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
import useAppAuthentication from 'src/hooks/useAppAuthentication';
import { apisCanvasComment, apisCanvasLike } from 'src/services/apiConfig';

import { ArrowBack, Canva, ChatBubble, ChatBubbleOutline, CommentsContainer, FavoriteBorder, Paper } from './styles';

export type VisualizerProps = {
  image: string;
  username: string;
  profilePicture: string;
  comments: { username: string; comment: string; profilePicture: string }[];
  likes: number;
  currentUserLikes: boolean;
  accessToken: string;
};
export default function Visualizer(props: VisualizerProps) {
  useAppAuthentication(props.accessToken);
  const { back, asPath, query } = useRouter();
  const { t } = useTranslation();
  const [currentUserLikes, setCurrentUserLikes] = useState(props.currentUserLikes);
  const [showInput, setShowInput] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(props.comments);
  const handleLike = async (like: boolean) => {
    if (query.vignette) {
      const prevCurrentUserLikes = currentUserLikes;
      const prevLikes = likes;
      setCurrentUserLikes(like);
      setLikes(prevValue => prevValue + (like ? 1 : -1));
      try {
        if (like) {
          await apisCanvasLike.postCanvasLike(query.vignette as string);
        } else {
          // TODO add delete like
        }
      } catch (e) {
        setCurrentUserLikes(prevCurrentUserLikes);
        setLikes(prevLikes);
      }
    }
  };

  const url = useMemo(() => `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`, [asPath]);

  const commentHandler = async () => {
    if (query.vignette) {
      const prevComment = comment;
      const prevComments = comments;
      try {
        setComment('');
        setComments(prevValue => [
          ...prevValue,
          { username: props.username, comment: prevComment, profilePicture: props.profilePicture },
        ]);
        await apisCanvasComment.postCanvasComment(query.vignette as string, prevComment);
      } catch (e) {
        setComment(prevComment);
        setComments(prevComments);
      }
    }
  };

  return (
    <DefaultLayout>
      <Grid container item direction="column" padding="1rem" gap="1rem">
        <Grid item>
          <IconButton size="large" onClick={back}>
            <ArrowBack fontSize="inherit" />
          </IconButton>
        </Grid>
        <Grid container item xs justifyContent="center">
          <Paper elevation={3}>
            <Grid container xs direction="column" gap="1rem" alignSelf="center" style={{ height: '100%' }}>
              <Grid container item padding="1rem" paddingTop="0" paddingBottom="0.5rem" alignItems="center" gap="1rem">
                <Avatar src={props.profilePicture} style={{ width: '3rem', height: '3rem' }} />
                <Typography variant="h4" margin={0}>
                  {props.username}
                </Typography>
              </Grid>
              <Grid container xs item alignItems="center" justifyContent="center" gap="2rem">
                <Canva container item xs alignItems="center" justifyContent="center" image={props.image} />
                <Grid container item xs direction="column" gap="1rem" style={{ height: '100%' }}>
                  <CommentsContainer
                    container
                    item
                    xs
                    direction="column"
                    overflow="scroll"
                    flexWrap="nowrap"
                    gap="1rem">
                    {comments.length ? (
                      comments.map(({ username, comment: commentText, profilePicture }) => (
                        <Grid container item alignItems="center" gap="1rem">
                          <Avatar src={profilePicture} style={{ width: '2rem', height: '2rem' }} />
                          <Typography margin={0} variant="h6">
                            {username}
                          </Typography>
                          <Typography margin={0} variant="body2">
                            {commentText}
                          </Typography>
                        </Grid>
                      ))
                    ) : (
                      <Typography margin="auto" variant="h6">
                        {t('canva.noComments')}
                      </Typography>
                    )}
                  </CommentsContainer>
                  <Grid container item alignItems="flex-start" gap="1rem">
                    {!!props.accessToken && (
                      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <IconButton size="large" onClick={() => handleLike(!currentUserLikes)}>
                          {currentUserLikes ? (
                            <Favorite fontSize="inherit" sx={{ color: 'red' }} />
                          ) : (
                            <FavoriteBorder fontSize="inherit" />
                          )}
                        </IconButton>
                        <Typography variant="subtitle2" margin={0}>
                          {likes}
                        </Typography>
                      </div>
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
                  </Grid>
                  {showInput && (
                    <Grid container item alignItems="center" gap="1rem">
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
                        {t('send')}
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}
