import React, { useEffect, useState } from 'react';

import { Avatar, Box, Typography, Grid, MenuItem, IconButton, Menu } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Route } from 'src/constants/routes';
import { apiUserProfile } from 'src/services/apiConfig';
import { RootState } from 'src/store/rootReducer';

import { AppBarMui, ButtonSignUp, ButtonLogIn, ButtonBox, StyledLogoIcon } from './styles';

export const TopBar = dynamic(
  Promise.resolve(() => {
    const { t } = useTranslation();
    const { push } = useRouter();
    const accessToken = useSelector((state: RootState) => state.auth.token);
    const [anchorMenuUser, setAnchorMenuUser] = useState<null | HTMLElement>(null);
    const [userProfile, setUserProfile] = useState('');

    useEffect(() => {
      if (!accessToken) return;
      apiUserProfile
        .getUserProfile({})
        .then(({ data }) => {
          setUserProfile(data.image_url);
        })
        .catch(e => console.log(e));
    }, [accessToken]);

    const userMenuOptions = [
      { title: t('topBar.menu.profile'), handler: () => push(Route.profile) },
      { title: t('topBar.menu.logout'), handler: () => push(Route.logout) },
    ];

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorMenuUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorMenuUser(null);
    };

    const onClickLogo = () => {
      push(Route.home);
    };

    return (
      <Grid container>
        <Grid item xs>
          <AppBarMui>
            <ButtonBox onClick={onClickLogo}>
              <StyledLogoIcon />
            </ButtonBox>
            {accessToken ? (
              <Box>
                <IconButton style={{ padding: 0 }} onClick={handleOpenUserMenu}>
                  <Avatar src={userProfile} sx={{ height: '3rem', width: '3rem' }} />
                </IconButton>
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
                <ButtonLogIn onClick={() => push(Route.login)} size="medium">
                  {t('topBar.login')}
                </ButtonLogIn>
                <ButtonSignUp onClick={() => push(Route.login)} size="medium" variant="outlined">
                  {t('topBar.signup')}
                </ButtonSignUp>
              </ButtonBox>
            )}
          </AppBarMui>
        </Grid>
      </Grid>
    );
  }),
  { ssr: false },
);
