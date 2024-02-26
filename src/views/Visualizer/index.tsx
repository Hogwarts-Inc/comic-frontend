/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useMemo, useState } from 'react';

import { CrossmintNFTDetail } from '@crossmint/client-sdk-react-ui';
import { Favorite } from '@mui/icons-material';
import { Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
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
import useAppAuthentication from 'src/hooks/useAppAuthentication';
import useIsMobile from 'src/hooks/useIsMobile';
import { TransferNFTData, apisCanvasComment, apisCanvasLike, apisNFT } from 'src/services/apiConfig';

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
  walletAddress: string;
  tokenId: string;
  transferred: boolean;
};
export default function Visualizer(props: VisualizerProps) {
  useAppAuthentication(props.accessToken);
  const { back, asPath, query } = useRouter();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const { open } = useWeb3Modal();
  // const { disconnect } = useDisconnect();
  const { address, isConnected } = useWeb3ModalAccount();

  const [currentUserLikes, setCurrentUserLikes] = useState(props.currentUserLikes);
  const [showInput, setShowInput] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(props.comments);
  const [isShowingNFT, setIsShowingNFT] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const isOwner = props.currentUserUsername === props.username;

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

  const handleFlip = () => {
    setIsShowingNFT(!isShowingNFT);
  };

  const handleConnectClick = () => {
    open();
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

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const proceedWithTransfer = async () => {
    try {
      const { tokenId } = props;
      const toAddress = address as string;
      const fromAddress = props.walletAddress;

      const transferData: TransferNFTData = {
        chain: 'polygon',
        fromAddress,
        toAddress,
        tokenId,
        tokenMintAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '',
      };

      console.log('transferData:', transferData);

      await apisNFT.transferNFT(transferData);

      alert('NFT transferred successfully!');
    } catch (error) {
      console.error('Error transferring NFT:', error);
      alert('Failed to transfer NFT. See console for details.');
    } setOpenConfirmDialog(false);
  };

  return (
    <DefaultLayout disableFooter={isMobile}>
      <Container container>
        <Grid item container justifyContent="space-between">
          <IconButton size="large" style={{ fontSize: '2.5rem' }} onClick={back}>
            <ArrowBack fontSize="inherit" />
          </IconButton>
          <Button variant="contained" onClick={handleFlip}>{isShowingNFT ? 'See canva' : 'See NFT details'}</Button>
        </Grid>
        <Grid item xs marginBottom="2rem" justifyContent="center">
          <ReactCardFlip
            isFlipped={isShowingNFT}
            containerStyle={{ height: '100%' }}
            flipDirection="horizontal"
            >
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
                          <CommentContainer container>
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
                      <IconButton size="large" style={{ fontSize: '3rem' }}>
                        {showInput ? (
                          <ChatBubble fontSize="inherit" onClick={() => setShowInput(!showInput)} />
                        ) : (
                          <ChatBubbleOutline fontSize="inherit" onClick={() => setShowInput(!showInput)} />
                        )}
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
            <Paper elevation={3} key="back">
              <Grid container style={{ height: '80vh' }} flexDirection="row" justifyContent="end" alignItems="center">
                <Grid item style={{ flexGrow: 1 }} />
                {
                  props.accessToken && isOwner &&
                  <Grid item>
                    {isConnected && props.transferred ? (
                      <Typography>NFT claimed</Typography>
                    ) : isConnected ? (
                      <Button onClick={handleOpenConfirmDialog}>Claim NFT</Button>
                    ) : (
                      <Button onClick={handleConnectClick}>Connect Wallet</Button>
                    )}
                    {/* <w3m-connect-button /> */}
                  </Grid>
                }
                <CrossmintNFTDetail
                  nft={{
                    chain: 'polygon',
                    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '',
                    tokenId: props.tokenId,
                  }}
                  environment="staging" />
              </Grid>
            </Paper>
          </ReactCardFlip>

        </Grid>
      </Container>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm NFT Transfer
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to transfer this NFT?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button onClick={proceedWithTransfer} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    </DefaultLayout>

  );
}
