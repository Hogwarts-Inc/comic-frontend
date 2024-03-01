import React, { useEffect, useState } from 'react';

import StopCircleTwoToneIcon from '@mui/icons-material/StopCircleTwoTone';
import { Avatar, Box, Typography, Grid, MenuItem, IconButton, Menu } from '@mui/material';
import { useDisconnect, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Route } from 'src/constants/routes';
import { handleRemoveFromQueue } from 'src/helpers/chaptersQueue';
import useIsMobile from 'src/hooks/useIsMobile';
import { StoriettesParam, apisChapters } from 'src/services/api';
import { RootState } from 'src/store/rootReducer';

import { AppBarMui, ButtonSignUp, ButtonLogIn, ButtonBox, ButtonWaiting } from './styles';
import LogoIcon from '../Icons/logo.svg';

export const TopBar = ({ profilePicture, accessToken }: { profilePicture: string; accessToken: string }) => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const [anchorMenuUser, setAnchorMenuUser] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { isWaiting, chapterId } = useSelector((state: RootState) => state.chapterQueue);
  const [currentChapterQueue, setCurrentChapterQueue] = useState<StoriettesParam | undefined>();

  useEffect(() => {
    if (isWaiting && chapterId) {
      apisChapters.getChaptersById(chapterId).then(({ data }) => {
        setCurrentChapterQueue(data);
      });
    }
  }, [chapterId, isWaiting]);

  const { isConnected } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();

  const handleCloseUserMenu = () => {
    setAnchorMenuUser(null);
  };
  const userMenuOptions = [
    {
      title: t('topBar.menu.profile'),
      handler: () => {
        push(Route.profile);
        handleCloseUserMenu();
      },
    },
    {
      title: t('topBar.menu.logout'),
      handler: () => {
        if (isConnected) {
          disconnect().then(() => {
            push(Route.logout);
            handleCloseUserMenu();
          });
        } else {
          push(Route.logout);
        }
      },
    },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenuUser(event.currentTarget);
  };

  const onClickLogo = () => {
    push(Route.home);
  };
  return (
    <Grid container>
      <Grid item xs>
        <AppBarMui>
          <ButtonBox onClick={onClickLogo}>
            <LogoIcon />
          </ButtonBox>
          {accessToken ? (
            <Box>
              <ButtonBox>
                {isWaiting && (
                  <ButtonWaiting
                    onClick={() => handleRemoveFromQueue(chapterId)}
                    variant="outlined"
                    endIcon={<StopCircleTwoToneIcon style={{ marginLeft: '0.2rem' }} />}>
                    {isMobile
                      ? t('topBar.removeQueueMobile')
                      : `${t('topBar.removeQueueWeb')} ${currentChapterQueue?.title}`}
                  </ButtonWaiting>
                )}
                <IconButton style={{ padding: 0 }} onClick={handleOpenUserMenu}>
                  <Avatar src={profilePicture} sx={{ height: '3rem', width: '3rem' }} />
                </IconButton>
              </ButtonBox>
              <Menu
                sx={{ mt: '3.25rem' }}
                id="menu-appbar"
                anchorEl={anchorMenuUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorMenuUser)}
                onClose={handleCloseUserMenu}>
                {userMenuOptions.map(({ title, handler }) => (
                  <MenuItem key={title} onClick={() => handler?.()} style={{ minHeight: 0 }}>
                    <Typography textAlign="center">{title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <ButtonBox>
              <ButtonLogIn
                onClick={() => {
                  push(`${Route.login}?returnTo=${router.asPath}`);
                }}
                size="medium">
                {t('topBar.login')}
              </ButtonLogIn>
              <ButtonSignUp
                onClick={() => push(`${Route.login}?returnTo=${router.asPath}`)}
                size="medium"
                variant="outlined">
                {t('topBar.signup')}
              </ButtonSignUp>
            </ButtonBox>
          )}
        </AppBarMui>
      </Grid>
    </Grid>
  );
};
