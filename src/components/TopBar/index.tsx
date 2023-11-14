import React, { useState } from 'react';

import { Avatar, Box, Typography, Grid, MenuItem, IconButton, Menu } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { Route } from 'src/constants/routes';

import { AppBarMui, ToolbarMui, ButtonSignUp, ButtonLogIn, ButtonBox } from './styles';

interface TopBarProps {
  isAuthenticated: boolean;
}

export function TopBar({ isAuthenticated }: TopBarProps) {
  const [anchorMenuUser, setAnchorMenuUser] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const { push } = useRouter();

  const userMenuOptions = [
    { title: t('topBar.menu.profile') },
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
      <Grid item>
        <AppBarMui>
          <ToolbarMui disableGutters>
            {/* To do: Add logo and remove Typography*/}
            <Box>
              <Typography>LOGO</Typography>
            </Box>
            {isAuthenticated ? (
              <Box>
                {/* To do: add user picture */}
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar src="/static/images/avatar/2.jpg" />
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
}
