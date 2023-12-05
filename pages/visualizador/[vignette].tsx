/* eslint-disable react/destructuring-assignment */
import React, { useMemo, useState } from 'react';

import { ChatBubbleOutline, Favorite, FavoriteBorder, Share } from '@mui/icons-material';
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';
import DefaultLayout from '@components/DefaultLayout';
import { apisCanvas } from 'src/services/apiConfig';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';

type Data = {
  image: string;
  username: string;
  profilePicture: string;
  comments: { username: string; comment: string }[];
  likes: number;
  currentUserLikes: boolean;
};

export const getServerSideProps = (async context => {
  let data: Data = {
    image: '',
    username: '',
    profilePicture: '',
    comments: [],
    likes: 0,
    currentUserLikes: false,
  };
  if (context.query.vignette) {
    try {
      const { data: dataApi } = await apisCanvas.getCanvaById(+context.query.vignette);
      data = {
        image: dataApi.image_url,
        comments: dataApi.comments,
        username: dataApi.user_attributes.name,
        profilePicture: dataApi.user_attributes.picture,
        likes: dataApi.likes,
        currentUserLikes: false,
      };
    } catch (e) {
      console.log(e);
    }
  }

  return { props: data };
}) satisfies GetServerSideProps<Data>;

export default function Visualizer(props: InferGetStaticPropsType<typeof getServerSideProps>) {
  const { back, asPath } = useRouter();
  const { t } = useTranslation();
  const [currentUserLikes, setCurrentUserLikes] = useState(props.currentUserLikes);
  const [showInput, setShowInput] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const comments = Array.from({ length: 10 }).map((_, index) => ({
    username: `user-${index}`,
    comment: `comment-${index}`,
  }));
  const handleLike = (like: boolean) => {
    setCurrentUserLikes(like);
    setLikes(prevValue => prevValue + (like ? 1 : -1));
  };

  const url = useMemo(() => `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`, [asPath]);

  return (
    <DefaultLayout>
      <Grid container item direction="column" padding="1rem" gap="1rem">
        <Grid item>
          <Button onClick={back}>{t('volver')}</Button>
        </Grid>
        <Grid container xs direction="column" gap="1rem" style={{ maxWidth: '1000px' }} alignSelf="center">
          <Grid container item padding="1rem" paddingBottom="0.5rem" alignItems="center" gap="1rem">
            <Avatar src={props.profilePicture} style={{ width: '3rem', height: '3rem' }} />
            <Typography variant="h4" margin={0}>
              {props.username}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs
            alignItems="center"
            justifyContent="center"
            style={{
              backgroundImage: `url(${props.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }}
          />
          <Grid container item alignItems="center" gap="2rem">
            <IconButton size="large" onClick={() => handleLike(!currentUserLikes)}>
              {currentUserLikes ? (
                <Favorite fontSize="inherit" sx={{ color: 'red' }} />
              ) : (
                <FavoriteBorder fontSize="inherit" sx={{ stroke: 'black', fill: 'black', strokeWidth: 0.1 }} />
              )}
              <Typography
                position="absolute"
                variant="subtitle2"
                margin={0}
                color={currentUserLikes ? 'white' : 'black'}>
                {likes}
              </Typography>
            </IconButton>
            <IconButton size="large">
              <ChatBubbleOutline fontSize="inherit" sx={{ stroke: 'black', fill: 'black', strokeWidth: 0.1 }} />
            </IconButton>

            <FacebookShareButton url={url}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <XIcon size={40} round />
            </TwitterShareButton>
            <WhatsappShareButton url={url}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
          </Grid>
          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            direction="row"
            maxHeight="15%"
            overflow="scroll">
            {comments.map(({ username, comment }) => (
              <Grid container item alignItems="center" gap="1rem">
                <Typography margin={0} variant="h6">
                  {username}
                </Typography>
                <Typography margin={0} variant="body2">
                  {comment}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}
