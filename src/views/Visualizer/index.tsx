/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { CrossmintNFTDetail } from '@crossmint/client-sdk-react-ui';
import { Favorite } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useWeb3Modal, useWeb3ModalAccount, useDisconnect } from '@web3modal/ethers/react';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import ReactCardFlip from 'react-card-flip';
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
import { TransferNFTData } from 'pages/api/crossmint';
import useAppAuthentication from 'src/hooks/useAppAuthentication';
import useIsMobile from 'src/hooks/useIsMobile';
import { apisCanvasComment, apisCanvasLike } from 'src/services/api';

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
  url: string;
  isOwner: boolean;
} & Partial<{
  walletAddress: string;
  tokenId: string;
  transferred: boolean;
}>;

export default function Visualizer(props: VisualizerProps) {
  useAppAuthentication(props.accessToken);
  const { query, back } = useRouter();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const [currentUserLikes, setCurrentUserLikes] = useState(props.currentUserLikes);
  const [showInput, setShowInput] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(props.comments);

  const nftEnabled = process.env.NEXT_PUBLIC_NFT_TOGGLE === 'true';
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useWeb3ModalAccount();
  const [transferred, setTransferred] = useState(props.transferred);
  const [isShowingNFT, setIsShowingNFT] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

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

  const url = useMemo(() => props.url, [props]);

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

  const handleFlip = () => {
    setIsShowingNFT(!isShowingNFT);
  };

  const handleConnectClick = () => {
    open();
  };

  const handleDisconnectClick = () => {
    disconnect();
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleTransferNft = async () => {
    if (!nftEnabled) return;

    try {
      const transferData: TransferNFTData = {
        chain: 'polygon',
        fromAddress: props.walletAddress!,
        toAddress: address as string,
        tokenId: props.tokenId!,
        tokenMintAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '',
        userToken: props.accessToken,
      };

      await fetch('/api/crossmint', { method: 'POST', body: JSON.stringify(transferData) });
    } catch (error) {
      console.error('Error transferring NFT:', error);
    }
    setOpenConfirmDialog(false);
    setTransferred(true);
  };

  return (
    <DefaultLayout disableFooter={isMobile}>
      <Container container direction="column">
        <Grid item container justifyContent="space-between">
          <IconButton size="large" style={{ fontSize: '2.5rem' }} onClick={back}>
            <ArrowBack fontSize="inherit" />
          </IconButton>
          {nftEnabled && props.tokenId && (
            <Button variantType={isShowingNFT ? 'default' : 'gradient'} onClick={handleFlip}>
              {!isShowingNFT ? t('canva.seeNFT') : t('canva.seeCanva')}
            </Button>
          )}
        </Grid>
        <Grid container xs marginTop="1rem" marginBottom="0" justifyContent="center">
          <ReactCardFlip
            cardStyles={{ front: { transformStyle: 'unset' }, back: { transformStyle: 'unset' } }}
            isFlipped={isShowingNFT}
            containerStyle={{ height: '100%', width: '100%' }}
            flipDirection="horizontal">
            <Paper elevation={3} key="front">
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
                          <CommentContainer container key={`${username}${profilePicture}${commentText}`}>
                            <CommentProfile src={profilePicture} />
                            <Typography margin={0} variant="h5">
                              {username}
                            </Typography>
                            <Typography margin={0} variant="body1">
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
                          <IconButton
                            style={{ fontSize: '3rem' }}
                            size="large"
                            onClick={() => handleLike(!currentUserLikes, likes, currentUserLikes)}>
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
                        <IconButton size="large" style={{ fontSize: '3rem' }} onClick={() => setShowInput(!showInput)}>
                          {showInput ? <ChatBubble fontSize="inherit" /> : <ChatBubbleOutline fontSize="inherit" />}
                        </IconButton>
                      )}
                      <FacebookShareButton url={url} style={{ margin: '0.25rem' }}>
                        <FacebookIcon size="3rem" round />
                      </FacebookShareButton>
                      <TwitterShareButton url={url} style={{ margin: '0.25rem' }}>
                        <XIcon size="3rem" round />
                      </TwitterShareButton>
                      <WhatsappShareButton url={url} style={{ margin: '0.25rem' }}>
                        <WhatsappIcon size="3rem" round />
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
            {nftEnabled && (
              <Paper elevation={3} key="back">
                <SubContainer container xs>
                  {isClientLoaded && props.accessToken && props.isOwner && (
                    <Grid container item>
                      {isConnected ? (
                        <>
                          {transferred ? (
                            <Button disabled>{t('canva.claimed')}</Button>
                          ) : (
                            <Button onClick={handleOpenConfirmDialog} variantType="gradient">
                              {t('canva.claim')}
                            </Button>
                          )}
                          <Grid item style={{ flexGrow: 1 }} />
                          <Button onClick={handleDisconnectClick}>{t('canva.disconnectWallet')}</Button>
                        </>
                      ) : (
                        <Button onClick={handleConnectClick}>{t('canva.connectWallet')}</Button>
                      )}
                    </Grid>
                  )}
                  <Grid container xs>
                    <CrossmintNFTDetail
                      nft={{
                        chain: 'polygon',
                        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '',
                        tokenId: props.tokenId!,
                      }}
                      environment="staging"
                    />
                  </Grid>
                </SubContainer>
              </Paper>
            )}
          </ReactCardFlip>
        </Grid>
      </Container>
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>{t('canva.claimDialog.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`${t('canva.claimDialog.content')}\n${address}`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleTransferNft} autoFocus>
            {t('common.accept')}
          </Button>
        </DialogActions>
      </Dialog>
    </DefaultLayout>
  );
}
