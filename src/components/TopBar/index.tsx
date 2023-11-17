import React, { useState } from 'react';

import { Avatar, Box, Typography, Grid, MenuItem, IconButton, Menu } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { AppBarMui, ToolbarMui, ButtonSignUp, ButtonLogIn, ButtonBox } from './styles';

interface TopBarProps {
  isAuthenticated: boolean;
}

export function TopBar({ isAuthenticated }: TopBarProps) {
  const [anchorMenuUser, setAnchorMenuUser] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const userMenuOptions = [t('topBar.menu.profile'), t('topBar.menu.logout')];

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
                  {userMenuOptions.map(setting => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <ButtonBox>
                {/* To do: add on click navigation */}
                <ButtonLogIn size="medium">{t('topBar.login')}</ButtonLogIn>
                <ButtonSignUp size="medium" variant="outlined">
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
