import React, { useEffect, useState } from 'react';

import { Avatar, Box, Typography, Grid, MenuItem, IconButton, Menu } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Route } from 'src/constants/routes';
import { apiUserProfile } from 'src/services/apiConfig';
import { RootState } from 'src/store/rootReducer';

import { AppBarMui, ToolbarMui, ButtonSignUp, ButtonLogIn, ButtonBox } from './styles';

export const TopBar = dynamic(
  Promise.resolve(() => {
    const { t } = useTranslation();
    const { push } = useRouter();
    const accessToken = useSelector((state: RootState) => state.auth.token);
    const [anchorMenuUser, setAnchorMenuUser] = useState<null | HTMLElement>(null);
    const [userProfile, setUserProfile] = useState('');

    useEffect(() => {
      if (accessToken) {
        apiUserProfile.getUserProfile({}).then(({ data }) => {
          setUserProfile(data.picture);
        });
      }
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

    return (
      <Grid container>
        <Grid item xs>
          <AppBarMui>
            <ToolbarMui disableGutters>
              {/* To do: Add logo and remove Typography*/}
              <Box>
                <Typography>LOGO</Typography>
              </Box>
              {accessToken ? (
                <Box>
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar src={userProfile} />
                  </IconButton>
                  <Menu
                    sx={{ mt: '45px' }}
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
                      <MenuItem key={title} onClick={() => handler?.()}>
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
            </ToolbarMui>
          </AppBarMui>
        </Grid>
      </Grid>
    );
  }),
  { ssr: false },
);
